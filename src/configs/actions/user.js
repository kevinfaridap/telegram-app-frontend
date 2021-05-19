import axios from 'axios'
import axiosApiInstance from '../../helpers/axios'

export const update = (data, iduser) => dispatch=>{
  return new Promise((resolve, reject)=>{
    axios.put(`${process.env.REACT_APP_API}/users/${iduser}`, data)
    .then((res)=>{
      const result = res.data 
      dispatch({type: 'USER_UPDATE', payload: result})
      resolve(result)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}


export const getProfile = () => dispatch=>{
  return new Promise((resolve, reject)=>{
    axiosApiInstance.get(`${process.env.REACT_APP_API}/users/profile`)
    .then((res)=>{
      const dataUser = res.data.data[0]
      dispatch({type: 'GET_PROFILE', payload: dataUser})
      resolve(dataUser)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}