import axios from "axios";
//////names/////////////
export const FILTERS = "FILTERS";
export const ORDER = "ORDER";
export const RESET = "RESET";
export const LOADINGLOCALS = "LOADINGLOCALS";
export const SEARCH_BY_QUERY = "SEARCH_BY_QUERY";
export const DETAIL="DETAIL"
export const LOGIN = 'LOGIN';
export const COMENTARIE="COMENTARIE"
export const CREATE_USER = 'CREATE_USER';


//////////actions////////////////////////////

//filter
export const filter = () => {
  // const datapaginada=paginado(data)
  return {
    type: FILTERS,
    payload: data,
  };
};

export const reset = () => {
  return {
    type: RESET,
    payload: "",
  };
};
/// loadinglocals
export const loadingLocals = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/locals");
      dispatch({
        type: LOADINGLOCALS,
        payload: response.data.locals
      });
    } catch (error) {
      console.log(error.message);
      // Dispatch an error action if needed
      dispatch({
        type: LOADINGLOCALS_ERROR,
        payload: error.message
      });
    }
  };
};


  

/// Create user
export const createUser=({name,lastname,age,phone_number,email,password,location,verified,isActive,role})=>{

  return async(dispatch)=>{
    try {
       await axios.post("http://localhost:3001/user", {
        name,
        lastname,
        age:Number(age),
        phone_number,
        email,
        password,
        location,
        verified,
        isActive,
        role
      })
      return dispatch({ type: CREATE_USER, payload: "Usuario Creado Correctamente" })

      console.log("Usuario Creado mi vale");
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }
  }
}

//Detail id
export const DetailLocal=(id)=>{
  return async dispatch=>{
    try {
    const datos =await axios.get(`/locals/${id}`)
    dispatch({
        type: DETAIL,
        payload: datos.data
      });
    } catch (error) {
      console.log(error.message)
    }
  }
}

//correguir imagen cuando este listo la ruta
export const createLocal=(inputs, chekinputs)=>{
  let images=[]
 inputs.imagen.forEach(data=>{
   images.push({id:data.id})
 })
   return async dispatch => {
        try{
    await axios.post("/locals",{
    "name":inputs.name, 
    "location":inputs.location, 
    "schedule":inputs.schedule,
    "email":inputs.email,
    "images":images,
    "characteristics":{
			"wifi": chekinputs.wifi,
			"parking_lot": chekinputs.parking_lot,
			"outdoor_seating": chekinputs.outdoor_seating,
			"live_music": chekinputs.live_music,
			"table_service": chekinputs.table_service,
			"family_style": chekinputs.family_style,
			"romantic": chekinputs.romantic,
			"big_group": chekinputs.big_group,
			"work_friendly": chekinputs.work_friendly,
			"pet_friendly": chekinputs.pet_friendly
		}
    })
        }catch(error){
            console.log(error.message)
        }
      }     
}





//order and filters
export const order = (data, actions) => {
  console.log(data)
  const datas = data.flat();
  switch (actions) {
    case "best":
      for (let j = 0; j < datas.length; j++) {
        for (let i = 0; i < datas.length - 1; i++) {
          if (datas[i + 1].rating > datas[i].rating) {
            const auxiliar = datas[i];
            datas[i] = datas[i + 1];
            datas[i + 1] = auxiliar;
          }
        }
      }
      return {
        type: ORDER,
        payload: datas,
      };
    case "A-Z":
      const az = datas.sort((a, b) => a.name.localeCompare(b.name));
      return {
        type: ORDER,
        payload: az,
      };
    case "Z-A":
      const za = datas.sort((a, b) => b.name.localeCompare(a.name));
      return {
        type: ORDER,
        payload: za,
      };

    default:
      break;
  }
  //adgorithm aordering
};
export const searchByQuery = (data) => {
  const { input, map } = data;
  return async (dispatch) => {
    try {
      let response = await axios.get(`/locals?name=${input}&location=${map}`);
      let info = response.data.locals;
      return dispatch({ type: SEARCH_BY_QUERY, payload: info })
    } catch (error) {
      console.log(error.message)
      dispatch({
        type: LOADINGLOCALS_ERROR,
        payload: error.message
      });
    }
  };
};



export const logIn = (credentials) => {
  console.log('haciendo dispatch')
  return async (dispatch) => {
    const res = await axios.post("/login", credentials);
    return dispatch({
      type: LOGIN,
      payload: res.data
    })
  }
}

export const comentarie=(calificationFood,
          calificationQaPrice,
          calificationEnvironment,
          calificationService,
          calculateAverage, inputs,id)=>{

 return async dispatch => {
        try{
    await axios.post(`/reviews/${id}`,{
    title: inputs.title,
    rating: calculateAverage,
    comment: inputs.comment,
    image: inputs.image,
    food: calificationFood,
    service: calificationService,
    environment: calificationEnvironment,
    qaPrice: calificationQaPrice,
		})
        }catch(error){
            console.log(error)
        }
      }  


}