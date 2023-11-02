/* Amplify Params - DO NOT EDIT
  API_EMAILS_APIID
  API_EMAILS_APINAME
  ENV
  REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const { validationCreate, validationSend } = require('./validation')
const sesClient = new AWS.SES({ apiVersion: '2010-12-01' })

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.post('/emails', function (req, res) {
  const { name, emails } = req.body
  const { error } = validationSend.validate(req.body)

  if (error) {
    res.status(404).json(error)
    return;
  }

  const params = {
    Destinations: [{
      Destination: {
        ToAddresses: emails,
      }
    }],
    Source: 'olexandra.bilanenko@gmail.com',
    Template: name,
    DefaultTemplateData: JSON.stringify({}),
  }

  sesClient.sendBulkTemplatedEmail(params, (err, data) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(data)
  })
});

app.post('/create', function (req, res) {
  const { name, subject } = req.body
  const { error } = validationCreate.validate(req.body)

  if (error) {
    res.status(404).json(error)
    return;
  }

  const params = {
    Template: {
      TemplateName: name,
      HtmlPart: `
      <html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<style type="text/css">
    @media only screen and (max-width: 640px) {
        .sp-hidden-mob {
            display: none !important
        }
    }
</style>
<style type="text/css">
    table,
    td {
        border-collapse: collapse
    }

    img {
        height: auto;
        line-height: 100%;
        outline: 0;
        -ms-interpolation-mode: bicubic
    }

    a,
    img {
        text-decoration: none
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        line-height: 1.5;
        margin: 0 0 10px
    }

    ul>li {
        mso-special-format: bullet
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        line-height: 1.2;
        font-weight: 400
    }

    h1 {
        font-size: 36px
    }

    h2 {
        font-size: 30px
    }

    h3 {
        font-size: 24px
    }

    h4 {
        font-size: 20px
    }

    h5,
    p {
        font-size: 14px
    }

    hr {
        margin: 0
    }

    th.social_element,
    th.tc {
        font-weight: 400;
        text-align: left
    }

    td,
    th,
    tr {
        border-color: transparent
    }

    .content-cell {
        vertical-align: top
    }

    .content-cell table.social,
    .content-cell table.social table,
    .content-cell table.social td,
    .content-cell table.social th,
    .content-cell table.sp-button,
    .content-cell table.sp-button table,
    .content-cell table.sp-button td,
    .content-cell table.sp-button th,
    img {
        border: 0
    }

    #outlook a,
    .content-cell table.social td,
    .content-cell table.social th,
    .content-cell table.sp-button td,
    .content-cell table.sp-button th {
        padding: 0
    }

    .content-cell .sp-button table td,
    .content-cell table.social {
        line-height: 1
    }

    .content-cell>center>.sp-button {
        margin-left: auto;
        margin-right: auto
    }

    .content-cell .social,
    .content-cell .social_element,
    .content-cell .sp-button-side-padding,
    .content-cell .sp-button-text {
        border-color: transparent;
        border-width: 0;
        border-style: none
    }

    .content-cell .sp-button-side-padding {
        width: 21px
    }

    .content-cell .sp-button-text a {
        text-decoration: none;
        display: block
    }

    .content-cell .sp-button-text a img,
    .sp-video img {
        max-width: 100%
    }

    .content-cell em,
    .content-cell span[style*=color]>a,
    .email-text .data_text em,
    .email-text em,
    .email-wrapper span[style*=color]>a {
        color: inherit
    }

    .content-cell>div>.sp-img,
    .content-cell>div>a>.sp-img,
    body {
        margin: 0
    }

    .content-cell .link_img,
    .content-cell table.social .social_element img.social,
    .social_element img.social,
    .sp-video a {
        display: block
    }

    .content-cell .sp-button-img td {
        display: table-cell !important;
        width: initial !important
    }

    .content-cell>p,
    .email-text .data_text>p,
    .email-text>p {
        line-height: inherit;
        color: inherit;
        font-size: inherit
    }

    .content-cell>table,
    .content-cell>table>tbody>tr>td,
    .content-cell>table>tbody>tr>th,
    .content-cell>table>tr>td,
    .content-cell>table>tr>th,
    .email-text .data_text>table,
    .email-text .data_text>table>tbody>tr>td,
    .email-text .data_text>table>tbody>tr>th,
    .email-text .data_text>table>tr>td,
    .email-text .data_text>table>tr>th,
    .email-text>table,
    .email-text>table>tbody>tr>td,
    .email-text>table>tbody>tr>th,
    .email-text>table>tr>td,
    .email-text>table>tr>th {
        border-color: #ddd;
        border-width: 1px;
        border-style: solid
    }

    .content-cell>table td,
    .content-cell>table th,
    .email-text .data_text>table td,
    .email-text .data_text>table th,
    .email-text>table td,
    .email-text>table th {
        padding: 3px
    }

    .content-cell table.social .social_element,
    .social_element {
        padding: 2px 5px;
        font-size: 13px;
        font-family: Arial, sans-serif;
        line-height: 32px
    }

    .content-cell table.social .social_element_t_3 img.social,
    .content-cell table.social .social_element_t_4 img.social,
    .content-cell table.social .social_element_t_5 img.social,
    .content-cell table.social .social_element_v_i_t img.social {
        display: inline
    }

    .email-text table th {
        text-align: center
    }

    .email-text pre {
        background-color: transparent;
        border: 0;
        color: inherit;
        padding: 0;
        margin: 1em 0
    }

    .sp-video a {
        overflow: auto
    }

    @media only screen and (max-width:640px) {
        .sp-hidden-mob {
            display: none !important
        }
    }

    body {
        padding: 0
    }

    * {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%
    }

    table,
    td {
        mso-table-lspace: 0;
        mso-table-rspace: 0
    }

    .ExternalClass,
    .ReadMsgBody {
        width: 100%
    }

    .ExternalClass * {
        line-height: 100%
    }

    table {
        margin-bottom: 0 !important;
        border-color: transparent
    }

    u~div .gmail-hide {
        display: none
    }

    u~div .gmail-show {
        display: block !important
    }

    @media yahoo {
        .yahoo-hide {
            display: none
        }

        .yahoo-show {
            display: block !important
        }
    }

    .im {
        color: inherit !important
    }

    td[class^=xfmc] {
        width: inherit !important
    }

    @media only screen and (max-width:640px) {
        .wrapper-table {
            min-width: 296px
        }

        .sp-demo-label-link {
            display: block
        }

        td,
        th {
            margin-bottom: 0;
            height: inherit !important
        }

        td.content-cell,
        th.content-cell {
            padding: 15px !important
        }

        table.email-checkout.email-checkout-yandex,
        td.content-cell .social,
        td.no-responsive p>a,
        th.content-cell .social,
        th.no-responsive p>a {
            width: auto !important
        }

        td.content-cell .share th,
        td.content-cell .social td .share td,
        td.content-cell .social th,
        th.content-cell .share th,
        th.content-cell .social td .share td,
        th.content-cell .social th {
            display: inline-block !important
        }

        td,
        td.content-cell .share th.social_element_t_3,
        td.content-cell .share th.social_element_t_4,
        td.content-cell .social td .share td.social_element_t_3,
        td.content-cell .social td .share td.social_element_t_4,
        td.content-cell .social th.social_element_t_3,
        td.content-cell .social th.social_element_t_4,
        th,
        th.content-cell .share th.social_element_t_3,
        th.content-cell .share th.social_element_t_4,
        th.content-cell .social td .share td.social_element_t_3,
        th.content-cell .social td .share td.social_element_t_4,
        th.content-cell .social th.social_element_t_3,
        th.content-cell .social th.social_element_t_4 {
            display: block !important
        }

        td.content-cell .share th a>img,
        td.content-cell .social td .share td a>img,
        td.content-cell .social th a>img,
        th.content-cell .share th a>img,
        th.content-cell .social td .share td a>img,
        th.content-cell .social th a>img {
            width: 32px !important;
            height: 32px !important
        }

        td.content-cell>td,
        th.content-cell>td {
            width: 100%
        }

        .tc.responsive,
        td.content-cell>p,
        th.content-cell>p {
            width: 100% !important
        }

        td.content-cell.padding-lr-0,
        th.content-cell.padding-lr-0 {
            padding-left: 0 !important;
            padding-right: 0 !important
        }

        td.content-cell.padding-top-0,
        th.content-cell.padding-top-0 {
            padding-top: 0 !important
        }

        td.content-cell.padding-bottom-0,
        th.content-cell.padding-bottom-0 {
            padding-bottom: 0 !important
        }

        .sp-video {
            padding-left: 15px !important;
            padding-right: 15px !important
        }

        .wrapper-table>tbody>tr>td {
            padding: 0
        }

        .block-divider {
            padding: 2px 15px !important
        }

        .social_share {
            width: 16px !important;
            height: 16px !important
        }

        .sp-button td {
            width: initial !important
        }

        .sp-button td.sp-button-side-padding {
            width: 21px !important
        }

        input {
            max-width: 100% !important
        }

        table {
            border-width: 1px
        }

        .sp-button td,
        .tc.no-responsive,
        table.origin-table td {
            display: table-cell !important
        }

        .inline-item,
        table.smallImg td.smallImg {
            display: inline !important
        }

        table.origin-table {
            width: 95% !important
        }

        table.origin-table td {
            padding: 0 !important
        }

        .p100_img {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important
        }

        table.social {
            width: initial !important
        }
    }

    @media only screen and (max-width:640px) and screen and (-ms-high-contrast:active),
    only screen and (max-width:640px) and (-ms-high-contrast:none) {

        td,
        th {
            float: left;
            width: 100%;
            clear: both
        }

        .content-cell img,
        img:not(.p100_img) {
            width: auto;
            height: auto;
            max-width: 269px !important;
            margin-right: auto;
            display: block !important;
            margin-left: auto
        }
    }

    .content-cell {
        word-break: break-word
    }

    .content-cell * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box
    }

    .rollover {
        font-size: 0
    }

    @media only screen and (max-width:640px) {

        .rollover img.sp-img.desktop,
        .rollover img.sp-img.desktop.rollover-first,
        .rollover img.sp-img.desktop.rollover-second,
        img.sp-img.desktop {
            display: none !important
        }

        img.sp-img.mobile {
            display: block !important
        }
    }

    @media only screen and (min-width:641px) {

        .rollover img.sp-img.mobile,
        .rollover img.sp-img.mobile.rollover-first,
        .rollover img.sp-img.mobile.rollover-second {
            display: none !important
        }
    }

    .rollover:hover .desktop.rollover-first,
    .rollover:hover .mobile.rollover-first {
        max-height: 0 !important;
        display: none !important;
    }

    .rollover .desktop.rollover-second,
    .rollover .mobile.rollover-second {
        max-height: 0 !important;
        display: none !important;
    }

    .rollover:hover .desktop.rollover-second,
    .rollover:hover .mobile.rollover-second {
        max-height: none !important;
        display: block !important;
        object-fit: cover;
    }

    td.content-cell .social th {
        display: inline-block !important;
    }

    @media only screen and (max-width:640px) {
        table {
            width: 100% !important;
        }

        table,
        hr {
            width: 100%;
            max-width: 100% !important;
        }

        td,
        div {
            width: 100% !important;
            height: auto !important;
            box-sizing: border-box;
        }

        td,
        th {
            display: block !important;
            margin-bottom: 0;
            height: inherit !important;
        }
    }
</style>
<div style="font-size:18px; line-height:1.5; background-color:#fff9f2" bgcolor="#fff9f2">
    <table class="wrapper-table" cellpadding="5" cellspacing="0" width="100%" border="0"
        style="border-collapse:collapse; font-size:18px; line-height:1.5; background-repeat:repeat-y; background-position:top left"
        background="https://s8234269.sendpul.se/image/747991a0e145ac2bbe69f063a9402e69/files/emailservice/userfiles/e87c2cc59bdd62b30b9245c0a00c5c32366067/01-random/authors-st-el-1.png">
        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="frame" src="https://s8234269.sendpul.se/image/747991a0e145ac2bbe69f063a9402e69/files/emailservice/userfiles/e87c2cc59bdd62b30b9245c0a00c5c32366067/01-random/authors-st-el-1.png" color="#fff9f2"></v:fill>        </v:background><![endif]-->
        <tbody>
            <tr style="border-color:transparent">
                <td align="center" style="border-collapse:collapse; border-color:transparent">
                    <table cellpadding="0" cellspacing="0" width="600px" id="bodyTable" border="0" bgcolor="#fff9f2"
                        style="border-collapse:collapse; font-size:18px; line-height:1.5">
                        <tbody>
                            <tr style="border-color:transparent">
                                <td border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse:collapse; border-color:transparent">
                                    <table cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                        border="0" width="100%">
                                        <tbody>
                                            <tr style="border-color:transparent">
                                                <td style="border-collapse:collapse; border-color:transparent; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; vertical-align:top"
                                                    border="0" cellpadding="0" cellspacing="0" valign="top">
                                                    <table cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                                        border="0" width="100%">
                                                        <tbody>
                                                            <tr style="border-color:transparent">
                                                                <th width="600"
                                                                    style="border-color:transparent; font-weight:400; text-align:left; vertical-align:top"
                                                                    cellpadding="0" cellspacing="0"
                                                                    class="tc responsive " align="left" valign="top">
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        id="wout_block_out_block_14"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; text-color:black; background-color:transparent; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif; font-family-short:georgia; font-weight:normal; color:#694d4d; margin:0; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell"
                                                                                                    width="520"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:40px; padding-right:40px; padding-top:15px; padding-bottom:15px"
                                                                                                    valign="top">
                                                                                                    <p style="line-height:inherit; margin:0 0 10px; font-size:inherit; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif; text-align:center; font-weight:normal; padding:0"
                                                                                                        align="center">
                                                                                                        <strong>Дякую що
                                                                                                            приймали
                                                                                                            участь у
                                                                                                            Майстер-класі</strong>
                                                                                                    </p>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                        border="0" width="100%">
                                        <tbody>
                                            <tr style="border-color:transparent">
                                                <td style="border-collapse:collapse; border-color:transparent; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; vertical-align:top"
                                                    border="0" cellpadding="0" cellspacing="0" valign="top">
                                                    <table cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                                        border="0" width="100%">
                                                        <tbody>
                                                            <tr style="border-color:transparent">
                                                                <th width="600"
                                                                    style="border-color:transparent; font-weight:400; text-align:left; vertical-align:top"
                                                                    cellpadding="0" cellspacing="0"
                                                                    class="tc responsive " align="left" valign="top">
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell"
                                                                                                    width="570"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:15px; padding-right:15px; padding-top:15px; padding-bottom:15px"
                                                                                                    valign="top">
                                                                                                    <center>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            border="0"
                                                                                                            cellspacing="0"
                                                                                                            class="sp-button flat auto-width"
                                                                                                            style="border-collapse:collapse; font-size:18px; line-height:1.5; border:0; margin-left:auto; margin-right:auto; width:auto !important; border-radius:5px; box-shadow:none; background:#e1ad90"
                                                                                                            width="auto !important">
                                                                                                            <tbody>
                                                                                                                <tr
                                                                                                                    style="border-color:transparent">
                                                                                                                    <td class="sp-button-text"
                                                                                                                        style="border-collapse:collapse; border-color:transparent; border-width:0; border-style:none; border:0; padding:0; align:center; border-radius:5px; width:auto; height:40px; vertical-align:middle; text-align:center"
                                                                                                                        width="auto"
                                                                                                                        height="40"
                                                                                                                        valign="middle"
                                                                                                                        align="center">
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            border="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="border-collapse:collapse; font-size:18px; line-height:1.5; border:0">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="border-color:transparent">
                                                                                                                                    <td align="center"
                                                                                                                                        style="border-collapse:collapse; border-color:transparent; border:0; padding:0; line-height:1">
                                                                                                                                        <a style="text-decoration:none; color:#FFF; display:block; padding:12px 18px; font-family:Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-family-short:arial; font-size:16px; font-weight:bold"
                                                                                                                                            href="https://drive.google.com/drive/folders/1WcNLoyYD_76HVlsmeVS3wfhDdjy1TSq3">ВОРКБУК</a>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </center>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell"
                                                                                                    width="570"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:15px; padding-right:15px; padding-top:15px; padding-bottom:15px"
                                                                                                    valign="top">
                                                                                                    <center>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            border="0"
                                                                                                            cellspacing="0"
                                                                                                            class="sp-button flat auto-width"
                                                                                                            style="border-collapse:collapse; font-size:18px; line-height:1.5; border:0; margin-left:auto; margin-right:auto; width:auto !important; border-radius:5px; box-shadow:none; background:#694d4d"
                                                                                                            width="auto !important">
                                                                                                            <tbody>
                                                                                                                <tr
                                                                                                                    style="border-color:transparent">
                                                                                                                    <td class="sp-button-text"
                                                                                                                        style="border-collapse:collapse; border-color:transparent; border-width:0; border-style:none; border:0; padding:0; align:center; border-radius:5px; width:auto; height:40px; vertical-align:middle; text-align:center"
                                                                                                                        width="auto"
                                                                                                                        height="40"
                                                                                                                        valign="middle"
                                                                                                                        align="center">
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            border="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="border-collapse:collapse; font-size:18px; line-height:1.5; border:0">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="border-color:transparent">
                                                                                                                                    <td align="center"
                                                                                                                                        style="border-collapse:collapse; border-color:transparent; border:0; padding:0; line-height:1">
                                                                                                                                        <a style="text-decoration:none; color:#FFF; display:block; padding:12px 18px; font-family:Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-family-short:arial; font-size:16px; font-weight:bold"
                                                                                                                                            href="https://us06web.zoom.us/rec/share/phx9eM7ZFdC8EaOZ11NDg1uYXNTyo0XIuGpPnzl7xUclryEa-lhgbb8VpHPtIk8O.jYieFlTuVVUqJfvy">ЗАПИС
                                                                                                                                            ТРАНСЛЯЦІЇ</a>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </center>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        id="wout_block_out_block_13"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; text-color:black; font-weight:normal; margin:0; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell"
                                                                                                    width="570"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:15px; padding-right:15px; padding-top:15px; padding-bottom:15px"
                                                                                                    valign="top">
                                                                                                    <p style="line-height:inherit; margin:0 0 10px; font-size:inherit; color:inherit; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif; text-align:center; font-weight:normal; padding:0"
                                                                                                        align="center">
                                                                                                        <span
                                                                                                            style="font-size: 16px;">Код
                                                                                                            доступу:
                                                                                                            9.AGG+s7</span>
                                                                                                    </p>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                        border="0" width="100%">
                                        <tbody>
                                            <tr style="border-color:transparent">
                                                <td style="border-collapse:collapse; border-color:transparent; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; vertical-align:top"
                                                    border="0" cellpadding="0" cellspacing="0" valign="top">
                                                    <table cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                                        border="0" width="100%">
                                                        <tbody>
                                                            <tr style="border-color:transparent">
                                                                <th width="600"
                                                                    style="border-color:transparent; font-weight:400; text-align:left; vertical-align:top"
                                                                    cellpadding="0" cellspacing="0"
                                                                    class="tc responsive " align="left" valign="top">
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table class="separator"
                                                                                        width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; background-color:#f9e2d2; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; height:10px"
                                                                                        bgcolor="#f9e2d2" height="10">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                style="border-color:transparent">
                                                                                                <td height="10"
                                                                                                    style="border-collapse:collapse; border-color:transparent">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table class="separator"
                                                                                        width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; background-color:#e1ad90; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; height:10px"
                                                                                        bgcolor="#e1ad90" height="10">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                style="border-color:transparent">
                                                                                                <td height="10"
                                                                                                    style="border-collapse:collapse; border-color:transparent">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        id="wout_block_4_element_0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell padding-lr-0 padding-top-0 padding-bottom-0"
                                                                                                    width="600"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0"
                                                                                                    valign="top">
                                                                                                    <div id="wout_block_4_element_0"
                                                                                                        style="font-size:18px; line-height:1.5; width:100%; height:190; display:block"
                                                                                                        width="100%"
                                                                                                        height="190">
                                                                                                        <img border="0"
                                                                                                            width="600"
                                                                                                            height="auto"
                                                                                                            class="desktop  sp-img "
                                                                                                            align="left"
                                                                                                            alt="IMG_9312"
                                                                                                            src="https://s8234269.sendpul.se/files/emailservice/userfiles/a54ae1d13a922eed7095d710da79b67c8234269/IMG_9312.JPG"
                                                                                                            iout_block_4_element_0=""
                                                                                                            style="height:auto; line-height:100%; outline:0; text-decoration:none; border:0; margin:0; display:block; -ms-interpolation-mode:bicubic"><!--[if !mso]><!-->
                                                                                                        <div
                                                                                                            style="font-size:18px; line-height:1.5; mso-hide:all">
                                                                                                            <img border="0"
                                                                                                                width="100%"
                                                                                                                height="auto"
                                                                                                                class="mobile  sp-img "
                                                                                                                align="left"
                                                                                                                alt="IMG_9312"
                                                                                                                src="https://s8234269.sendpul.se/files/emailservice/userfiles/a54ae1d13a922eed7095d710da79b67c8234269/IMG_9312.JPG"
                                                                                                                iout_block_4_element_0=""
                                                                                                                style="height:auto; line-height:100%; outline:0; text-decoration:none; border:0; -ms-interpolation-mode:bicubic; display:none; width:100%; max-width:100% !important">
                                                                                                        </div>
                                                                                                        <!--<![endif]-->
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        id="wout_block_out_block_14"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; text-color:black; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif; font-family-short:georgia; font-weight:normal; color:#694d4d; margin:0; overflow:hidden">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell padding-bottom-0"
                                                                                                    width="520"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:40px; padding-right:40px; padding-top:30px; padding-bottom:0"
                                                                                                    valign="top">
                                                                                                    <p style="line-height:inherit; margin:0 0 10px; font-size:inherit; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif; text-align:left; font-weight:normal; padding:0"
                                                                                                        align="left">
                                                                                                        Якщо виникнуть
                                                                                                        будь-які
                                                                                                        питання,
                                                                                                        звертайтеся до
                                                                                                        мого діректу
                                                                                                        @bilanenco, я
                                                                                                        залюбки
                                                                                                        відповім.</p>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                        border="0" width="100%">
                                        <tbody>
                                            <tr style="border-color:transparent">
                                                <td style="border-collapse:collapse; border-color:transparent; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; vertical-align:top"
                                                    border="0" cellpadding="0" cellspacing="0" valign="top">
                                                    <table cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                                        border="0" width="100%">
                                                        <tbody>
                                                            <tr style="border-color:transparent">
                                                                <th width="600"
                                                                    style="border-color:transparent; font-weight:400; text-align:left; vertical-align:top"
                                                                    cellpadding="0" cellspacing="0"
                                                                    class="tc responsive " align="left" valign="top">
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table class="separator"
                                                                                        width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; background-color:#f9e2d2; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; height:10px"
                                                                                        bgcolor="#f9e2d2" height="10">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                style="border-color:transparent">
                                                                                                <td height="10"
                                                                                                    style="border-collapse:collapse; border-color:transparent">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table class="separator"
                                                                                        width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; background-color:#e1ad90; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; height:10px"
                                                                                        bgcolor="#e1ad90" height="10">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                style="border-color:transparent">
                                                                                                <td height="10"
                                                                                                    style="border-collapse:collapse; border-color:transparent">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table class="separator"
                                                                                        width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; background-color:#fff0e5; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; height:35px"
                                                                                        bgcolor="#fff0e5" height="35">
                                                                                        <tbody>
                                                                                            <tr
                                                                                                style="border-color:transparent">
                                                                                                <td height="35"
                                                                                                    style="border-collapse:collapse; border-color:transparent">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0"
                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                        border="0" width="100%">
                                        <tbody>
                                            <tr style="border-color:transparent">
                                                <td style="border-collapse:collapse; border-color:transparent; padding-left:0; padding-right:0; padding-top:0; padding-bottom:0; vertical-align:top"
                                                    border="0" cellpadding="0" cellspacing="0" valign="top">
                                                    <table cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; width:100%"
                                                        border="0" width="100%">
                                                        <tbody>
                                                            <tr style="border-color:transparent">
                                                                <th width="600"
                                                                    style="border-color:transparent; font-weight:400; text-align:left; vertical-align:top"
                                                                    cellpadding="0" cellspacing="0"
                                                                    class="tc responsive " align="left" valign="top">
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="border-collapse:collapse; font-size:18px; line-height:1.5; border-top-right-radius:0; border-top-left-radius:0; border-bottom-left-radius:0; border-bottom-right-radius:0">
                                                                        <tbody>
                                                                            <tr style="border-color:transparent">
                                                                                <td cellpadding="0" cellspacing="0"
                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top"
                                                                                    valign="top">
                                                                                    <table width="100%" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        style="border-collapse:separate; font-size:18px; line-height:1.5; size:32px; order:1; background-color:#fff0e5; text-align:center; overflow:hidden"
                                                                                        bgcolor="#fff0e5"
                                                                                        align="center">
                                                                                        <tbody>
                                                                                            <tr class="content-row"
                                                                                                style="border-color:transparent; color:#694d4d; font-family:Georgia, &quot;Times New Roman&quot;, Times, serif">
                                                                                                <td class="content-cell padding-top-0"
                                                                                                    width="540"
                                                                                                    style="border-collapse:collapse; border-color:transparent; vertical-align:top; padding-left:30px; padding-right:30px; padding-top:0; padding-bottom:5px"
                                                                                                    valign="top">
                                                                                                    <table
                                                                                                        class="social"
                                                                                                        cellpadding="5"
                                                                                                        border="0"
                                                                                                        cellspacing="0"
                                                                                                        style="border-collapse:collapse; font-size:18px; line-height:1; border-color:transparent; border-width:0; border-style:none; border:0; display:inline-block; border-spacing:0">
                                                                                                        <tbody>
                                                                                                            <tr
                                                                                                                style="border-color:transparent">
                                                                                                                <th class="social_element social_element_h_i"
                                                                                                                    style="border-color:transparent; padding:2px 5px; font-size:13px; font-family:Arial, sans-serif; line-height:32px; font-weight:400; text-align:left; border-width:0; border-style:none; border:0"
                                                                                                                    align="left">
                                                                                                                    <a href="https://www.instagram.com/bilanenco/"
                                                                                                                        style="text-decoration:none; color:#ff6f36"><img
                                                                                                                            border="0"
                                                                                                                            alt="Instagram"
                                                                                                                            class="social small_img smallImg"
                                                                                                                            style="height:auto; line-height:100%; outline:0; text-decoration:none; border:0; border-color:transparent; border-width:0; border-style:none; display:block; margin:5px"
                                                                                                                            vspace="5"
                                                                                                                            hspace="5"
                                                                                                                            title="Instagram"
                                                                                                                            width="32"
                                                                                                                            height="auto"
                                                                                                                            src="https://s8234269.sendpul.se/img/constructor/social/logos/instagram.png"></a>
                                                                                                                </th>
                                                                                                                <th class="social_element social_element_h_i"
                                                                                                                    style="border-color:transparent; padding:2px 5px; font-size:13px; font-family:Arial, sans-serif; line-height:32px; font-weight:400; text-align:left; border-width:0; border-style:none; border:0"
                                                                                                                    align="left">
                                                                                                                    <a href="https://t.me/bilanenco"
                                                                                                                        style="text-decoration:none; color:#ff6f36"><img
                                                                                                                            border="0"
                                                                                                                            alt="Telegram"
                                                                                                                            class="social small_img smallImg"
                                                                                                                            style="height:auto; line-height:100%; outline:0; text-decoration:none; border:0; border-color:transparent; border-width:0; border-style:none; display:block; margin:5px"
                                                                                                                            vspace="5"
                                                                                                                            hspace="5"
                                                                                                                            title="Telegram"
                                                                                                                            width="32"
                                                                                                                            height="auto"
                                                                                                                            src="https://s8234269.sendpul.se/img/constructor/social/logos/telegram.png"></a>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    <div
                                                                                                        style="font-size:18px; line-height:1.5; clear:both">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</html>
      `,
      SubjectPart: subject,
    }
  }

  sesClient.createTemplate(params, (err, data) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(data)
  })
});

/****************************
* Example put method *
****************************/

app.put('/email', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/email/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/emails', function (req, res) {
  const { name } = req.body
  const params = {
    TemplateName: name
  }

  sesClient.deleteTemplate(params, (err, data) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(data)
  })
});

app.delete('/email/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
