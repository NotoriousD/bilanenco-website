import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { API } from 'aws-amplify';
import React, { useMemo, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorMessage } from "shared/ui/ErrorMessage";
import { Loader } from "shared/ui/Loader";
import { Portal } from "shared/ui/Portal";

import css from './registration.module.scss';

export interface Package {
  id: string
  name: string
  price: number
  benefits: string[]
  available_places: number
  policy: boolean
  subscribe: boolean
}

interface Props {
  packages?: Package[]
  packageId: string
  productId?: string
  contactId?: string | null
  onClose: () => void
}

export const schema = yup.object().shape({
  fullName: yup.string().required("Введіть ваше ПІБ"),
  email: yup.string().email('Email не валідний').required("Введіть email"),
  phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Неправильний номер (38099999999)'),
  // course_id: yup.string().required('Виберіть тариф'),
  subscribe: yup.bool()
});

export const Registration: React.FC<Props> = ({ packageId, packages = [], contactId = null, productId, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { handleSubmit, formState: { errors }, control, register } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      subscribe: true
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await API.post('orders', '/orders', {
        body: {
          product_type: 'events',
          currency: 'uah',
          id: productId,
          created_date: new Date(),
          contact_id: contactId,
          ...data,
        }
      });

      if (response?.pageUrl) {
        setIsSubmitting(false);
        window.location.href = response.pageUrl;
      }
    } catch (e) {
      setIsSubmitting(false);
      console.log(e);
    }
  };

  const getEnumOptions = useMemo(() => {
    return packages?.filter(({ available_places }) => available_places !== 0).map(({ id, name }) => ({
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

  console.log(errors);

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
          <div className={css.title}>Реєстрація</div>
          <form className={css.form} onSubmit={handleSubmit(handleSubmitForm)}>
            <div className={css.row}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ваше ПІБ"
                    className={css.textField}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors?.fullName && (
                <ErrorMessage
                  message={String(errors?.fullName.message)}
                />
              )}
            </div>
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
            <div className={css.row}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Телефон"
                    className={css.textField}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors?.phone && (
                <ErrorMessage
                  message={String(errors?.phone.message)}
                />
              )}
            </div>
            {/* {packages.length && <div className={css.row}>
              <FormControl className={css.selectWrapper}>
                <InputLabel className={css.selectLabel}>
                  Тариф
                </InputLabel>
                <Select
                  {...register('course_id')}
                  className={css.select}
                  label="Тариф"
                  disabled={isSubmitting}
                >
                  {getEnumOptions.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.course_id && (
                <ErrorMessage
                  message={String(errors?.course_id.message)}
                />
              )}
            </div>
            } */}
            <div className={css.row}>
              <Controller
                name="subscribe"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                        />
                      }
                      label="Я хочу отримувати повідомлення про новинки, акції та події"
                      className={css.checkboxLabel}
                    />
                    {errors?.subscribe && (
                      <ErrorMessage
                        message={String(errors?.subscribe.message)}
                      />
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className={css.text}>
              Натискаючи на &quot;Перейти до оплати&quot; я погоджуюсь на обробку персональних даних
            </div>
            <div className={css.btnWrapper}>
              <button className={css.button} type="submit">Перейти до оплати</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Portal>;
}