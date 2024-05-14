import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, FormControlLabel } from "@mui/material"
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { API } from 'aws-amplify'
import React, { useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { Currencies } from 'shared/ui/Currencies'
import { ErrorMessage } from "shared/ui/ErrorMessage"
import { Loader } from "shared/ui/Loader"
import { Portal } from "shared/ui/Portal"

import css from './registration.module.scss'

interface Props {
  productId?: string
  contactId?: string | null
  productType: 'events' | 'courses' | 'products'
  currency: Currencies
  funnel?: string | null
  onClose: () => void
  onClick?: () => void
}

export const schema = yup.object().shape({
  product_type: yup.string().required(),
  email: yup.string().email('Email не валідний').required("Введіть email"),
  subscribe: yup.bool()
});

export const Registration: React.FC<Props> = ({
  productType,
  contactId = null,
  productId,
  currency,
  funnel = null,
  onClose,
  onClick
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { handleSubmit, formState: { errors }, control, register } = useForm({
    defaultValues: {
      product_type: productType,
      email: '',
      subscribe: true
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await API.post('products', '/buy', {
        body: {
          product_type: productType,
          currency,
          id: productId,
          contact_id: contactId,
          funnel,
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

  useEffect(() => {
    document.body.classList.add('overflow');

    return () => {
      document.body.classList.remove('overflow');
    }
  }, []);

  useEffect(() => {
    if (window && 'fbq' in window) {
      //@ts-ignore
      window.fbq('track', 'initialCheckout')
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
          <div className={css.title}>Покупка</div>
          <div className={css.presaleInfo}>Після оплати &quot;Інспобук&quot; буде надіслано вам на пошту</div>
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