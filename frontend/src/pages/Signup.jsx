import signupImg from '../assets/images/signup.gif'
import avatar from '../assets/images/avatar-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Signup = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    photo:selectedFile, 
    gender:'',
    role:'patient'
  })

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFileInputChange = async(e) => {
    const file = e.target.files[0];

    const data = await uploadImageToCloudinary(file);

    // console.log(data);
    setPreviewUrl(data.url)
    setSelectedFile(data.url);
    setFormData({...formData, photo:data.url})
  }

  const submitHandler = async (e) => {

    // console.log(formData);
    e.preventDefault();
    setLoading(true)

    //api call
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method:'post',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      })

      const {msg} = await res.json()

      if(!res.ok){
        throw new Error(msg)
      }

      console.log('registered ', res);
      setLoading(false)
      toast.success(msg)
      navigate('/login')

    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto'>
        <div className='grid grid-cols-2 lg:grid:cols-2'>
          {/* ====== img box ====== */}
          <div className='hidden lg:block bg-primaryColor rounded-l-lg '>
            <figure className='rounded-l-lg'>
              <img src={signupImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>


          {/* ======= signup form ========= */}
          <div className='rounded-l-lg lg:pl-16 py-10'>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
              Create an <span className='text-primaryColor'>account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className='mb-5'>
              <input 
                type="text" 
                placeholder='Full Name' 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className='w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer'
                required
              />
              </div>
              <div className='mb-5'>
              <input 
                type="text" 
                placeholder='Enter your email' 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                className='w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer'
                required
              />
              </div>
              <div className='mb-5'>
              <input 
                type="password" 
                placeholder='Password' 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                className='w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer'
                required
              />
              </div>

              <div className='mb-5 items-center flex justify-between'>
                <label 
                  className='text-headingColor font-bold text-[16px] 
                  leading-7'
                >
                  Are you a:
                  <select 
                    name="role" 
                    className='text-textColor font-semibold text-[15px] leading-7
                  px-4 py-5 focus:outline-none'
                  value={formData.role}
                  onChange={handleInputChange}
                >
                    <option value="patient">Patient</option>
                    <option value="center">Lab/Center</option>
                  </select>
                </label>

                <label 
                  className='text-headingColor font-bold text-[16px] 
                  leading-7'
                >
                  Gender:
                  <select 
                    name="gender" 
                    className='text-textColor font-semibold text-[15px] leading-7
                    px-4 py-5 focus:outline-none'
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Feale</option>
                    <option value="others">Others</option>
                  </select>
                </label>
              </div>

              <div className='mb-5 flex items-center gap-3'>
                {/* show image only when slected */}
                {selectedFile && (
                  <figure className='w-[60px] rounded-full border-solid border-2 border-primaryColor'>
                    <img 
                      src={previewURL} 
                      alt="" 
                      className='w-full rounded-full' 
                    />
                  </figure>
                )}
                

                <div className='relative w-[130px] h-[50px]'>
                  <input 
                    type="file" 
                    name='photo'
                    id="customFile"
                    accept=".jpg, .png"
                    onChange={handleFileInputChange}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                    />
                  <label 
                    htmlFor="customFile" 
                    className='cursor-pointer absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-headingColor'>
                        Upload Photo
                  </label>
                </div>
              </div>

              <div className='mt-7'>
            <button
              // disabled={loading && true}
              type='submit'
              className='w-full bg-primaryColor text-white text-[18px] leading-[10px] rounded-lg px-4 py-3'
            >
              {loading ? (
                <HashLoader size={35} color='#ffffff'/>
                ) 
                : (
                  'Register'
                )}
            </button>
          </div>

          <p className='mt-5 text-textColor text-center'>
            Already have an account? 
              <Link to='/login' className='text-primaryColor'>
                Login
              </Link> 
          </p>
            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Signup