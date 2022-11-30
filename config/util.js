import axios from 'axios'

export const timeStamp = function () {
  const time = Date.now();
  return time
}

export const kooLogin = function (cName) {
  console.log('hitoryBackhitoryBackhitoryBack')
  cName = cName + '=';
  const cookieData = document.cookie;
  let start = cookieData.indexOf(cName);
  let cValue = '';
  if (start !== -1) {
    start += cName.length;
    let end = cookieData.indexOf(';', start);
    if (end === -1) end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  return unescape(cValue);
}

export const historyBack = function () {
  console.log('hitoryBackhitoryBackhitoryBack')
}

export const axiosForm = function (frm, url) {
  axios
    .post(process.env.VUE_APP_API + url, frm, {
      header: {
        'Context-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('axiosForm', res.data)
    })
    .catch((res) => {
      console.log('AXIOS FALSE', res)
    })
}

export const copyToClipBoard = function (id) {
  const content = document.getElementById(id)
  content.select()
  document.execCommand('copy')

  alert('Copied!')
}
