import React, { useMemo, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { API } from 'aws-amplify';

import { Portal } from "shared/ui/Portal";
import { Loader } from "shared/ui/Loader";
import { ErrorMessage } from "shared/ui/ErrorMessage";

import css from './registration.module.scss';

export interface Package {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  available_places: number;
  policy: boolean
}

interface Props {
  packages?: Package[];
  packageId: string;
  onClose: () => void;
}

export const schema = yup.object().shape({
  fullName: yup.string().required("Введіть ваше ПІБ"),
  email: yup.string().email('Email не валідний').required("Введіть email"),
  phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Неправильний номер (38099999999)'),
  course_id: yup.string().required('Виберіть тариф'),
  policy: yup.bool()
  .oneOf([true], 'Підтвердити'),
  subscribe: yup.bool()
  .oneOf([true], 'Підтвердити')
});


export const Registration: React.FC<Props> = ({ packageId, packages = [], onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubscribe, setSubscribe] = useState<boolean>(false);
  const [isPolicy, setPolicy] = useState<boolean>(false);


  const handleSubscribe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscribe(event.target.checked);
  };

  const handlePolicy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPolicy(event.target.checked);
  };


  const { handleSubmit, formState: { errors }, control, register } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      policy: isPolicy
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await API.post('orders', '/orders', {
        body: {
          ...data,
        }
      });

      if (response?.pageUrl) {
        setIsSubmitting(false);
        window.location.href = response.pageUrl;
      }
    } catch (e) {
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
            {packages.length && <div className={css.row}>
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
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.course_id && (
                <ErrorMessage
                  message={String(errors?.course_id.message)}
                />
              )}
            </div>
            }
            <div className={css.row}>
              <FormControl>
                <FormControlLabel 
                    control={
                      <Checkbox 
                      label="Підписатись на розсилку"
                      checked={isSubscribe}
                      onChange={handleSubscribe}
                      />
                    }
                    label="Підписатись на розсилку"
                    className={css.checkboxLabel}
                />
                {errors?.subscribe && !isSubscribe && (
                  <ErrorMessage
                    message={String(errors?.subscribe.message)}
                  />
                )}
              </FormControl>
               
            </div>
            <div className={css.row}>
              <FormControl>
                <FormControlLabel 
                    control={
                      <Checkbox 
                      checked={isPolicy}
                      onChange={handlePolicy}
                      label="Погоджуюсь з умовами політики конфіденційності"
                      />
                    }
                    label="Погоджуюсь з умовами політики конфіденційності"
                    className={css.checkboxLabel}
                />
                {errors?.policy && !isPolicy && (
                <ErrorMessage
                  message={String(errors?.policy.message)}
                />
              )}
              </FormControl>
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
