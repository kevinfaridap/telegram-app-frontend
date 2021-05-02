import axios from 'axios'

export const update = (data, iduser) => dispatch=>{
  return new Promise((resolve, reject)=>{
    axios.put(`http://localhost:8081/v1/users/${iduser}`, data)
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

  