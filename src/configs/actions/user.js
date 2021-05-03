import axios from 'axios'

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

  