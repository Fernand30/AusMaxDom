
import { incrementCounter, decrementCounter } from "../Actions/actionTypes";

const initialState = { data: {} };

export const SignIn = ( username,password) => {
	// hash = ''
	// if(password=='password1') hash = '7c6a180b36896a0a8c02787eeafb0e4c'
  // username = 'juanman234+clientnew@gmail.com'
   //hash = '7c6a180b36896a0a8c02787eeafb0e4c'
	 var jsonPostData = JSON.stringify({
             username: username,
             password: password
      });
      data = fetch('http://members.maxfreedom.com.au/api/login', {
           method: 'POST',
           headers: {
                        'Content-Type': 'application/json'
                      },
           body:jsonPostData,
            })
      return(data)
}

export const SignUp = ( username,email,password,accountType) => {
  
   var jsonPostData = JSON.stringify({
             username: username,
             email: email,
             password: password,
             accountType:accountType
      });
      data = fetch('http://members.maxfreedom.com.au/api/signup', {
           method: 'POST',
           headers: {
                        'Content-Type': 'application/json'
                      },
           body:jsonPostData,
            })
      return(data)
}

export const Forgot = (email) => {
  
   var jsonPostData = JSON.stringify({
             email: email
      });
      data = fetch('http://members.maxfreedom.com.au/api/login/forgot', {
           method: 'POST',
           headers: {
                        'Content-Type': 'application/json'
                      },
           body:jsonPostData,
            })
      return(data)
}

export const ContentFind = ( pageNo,userID) => {
  
   var jsonPostData = JSON.stringify({
             pageNo: pageNo,
             userID: userID
      });

      data = fetch('http://members.maxfreedom.com.au/api/account/contentFind', {
           method: 'POST',
           headers: {
                        'Content-Type': 'application/json'
                      },
           body:jsonPostData,
            })
      return(data)
}

export const DetailContent = (currentUserId,id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/content/'+id+'/'+currentUserId
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const BookingList = ( subAdmin,pageNo,id,userID) => {
   var jsonPostData = JSON.stringify({
             subAdmin: subAdmin,
             pageNo: pageNo,
             id: id,
             userID: userID,
      });           
      data = fetch('http://members.maxfreedom.com.au/api/account/bookingShift', {
           method: 'POST',
           headers: {
                        'Content-Type': 'application/json'
                      },
           body:jsonPostData,
            })
      return(data)
}

export const DetailBookingContent = (currentUserId,id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/booking/'+id+'/'+currentUserId
   //alert(url)
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const CurrentProfile = (id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/user/'+id
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const SearchByService = (id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/coach/profile/'+id
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const Skills = (id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/providerSearchskill/'+id
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const SearchByLocation = (location, id) => {
  
   var url = 'http://members.maxfreedom.com.au/api/account/coach/searchmyprovider/'+location+'/'+id
      data = fetch(url, {
          method: 'GET',
            })
      return(data)
}

export const uploadProImage = ( profileImage) => {
   var jsonPostData = JSON.stringify({
             profileImage: profileImage
      });
      data = fetch('http://members.maxfreedom.com.au/api/coach/profile/uploadProImage', {
           method: 'POST',
           headers: {
                        'Content-Type': 'multipart/form-data'
                      },
           body:jsonPostData,
          })
      return(data)
}



