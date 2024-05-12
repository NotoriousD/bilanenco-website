import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, FormControlLabel, FormLabel } from "@mui/material"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { API } from 'aws-amplify'
import React, { useMemo, useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { Package } from 'entities/Courses'

import { Currencies } from 'shared/ui/Currencies'
import { ErrorMessage } from "shared/ui/ErrorMessage"
import { Loader } from "shared/ui/Loader"
import { Portal } from "shared/ui/Portal"

import css from './registration.module.scss'

interface Props {
  packages?: Package[]
  packageId?: string | null
  productId?: string
  contactId?: string | null
  productType: 'events' | 'courses'
  onClose: () => void
}

export const schema = yup.object().shape({
  product_type: yup.string().required(),
  email: yup.string().email('Email не валідний').required("Введіть email"),
  package_id: yup.string().nullable().when('product_type', ([product_type]) => {
    return product_type === 'events' ? yup.string().nullable() : yup.string().required('Виберіть тариф')
  }),
});

export const RegistrationPresale: React.FC<Props> = ({
  packageId = null,
  packages = [],
  productType,
  contactId = null,
  productId,
  onClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const { handleSubmit, formState: { errors }, control, register } = useForm({
    defaultValues: {
      product_type: productType,
      email: '',
      package_id: packageId,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    setError(null)
    try {
      const response = await API.post('orders', '/presale', {
        body: {
          product_type: productType,
          id: productId,
          contact_id: contactId,
          ...data,
        }
      });

      if (response?.pageUrl) {
        setIsSubmitting(false);
        window.location.href = response.pageUrl;
      }
    } catch (e: any) {
      setIsSubmitting(false);
      setError(e.response.data.message)
    }
  };

  const getEnumOptions = useMemo(() => {
    return packages?.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }, [packages]);

  useEffect(() => {
    document.body.classList.add('overflow');

    return () => {
      document.body.classList.remove('overflow');
    }
  }, []);

  return <Portal>
    <div className={css.root}>
      <div className={css.drop}>
        <div className={css.content}>
          {isSubmitting && (
            <div className={css.loading}>
              <Loader />
            </div>
          )}
          <button className={css.close} onClick={onClose}>+</button>
          <div className={css.title}>За передзаписом</div>

          {error && <div className={css.generalError}><ErrorMessage message={error} /></div>}
          <form className={css.form} onSubmit={handleSubmit(handleSubmitForm)}>
            <div className={css.row}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    className={css.textField}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors?.email && (
                <ErrorMessage
                  message={String(errors?.email.message)}
                />
              )}
            </div>
            {packages.length && productType === 'courses' && <div className={css.row}>
              <FormControl className={css.selectWrapper}>
                <InputLabel className={css.selectLabel}>
                  Тариф
                </InputLabel>
                <Select
                  {...register('package_id')}
                  className={css.select}
                  label="Тариф"
                  defaultValue={packageId}
                  disabled={isSubmitting}
                >
                  {getEnumOptions.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.package_id && (
                <ErrorMessage
                  message={String(errors?.package_id.message)}
                />
              )}
            </div>
            }
            <div className={css.btnWrapper}>
              <button className={css.button} type="submit">Перейти до оплати</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Portal>;
}