import React from 'react'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import {Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../components/About'
import ServiceList from '../components/ServiceList'

const Home = () => {
  return (
    <>
      {/* ===== Hero Section ========= */}
        <section className='hero_section pt-[60px] 2xl:h-[800px] '>
          <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
              {/* ========== hero content ======== */}
              <div>
                <div className='lg:w-[570px]'>
                  <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px]
                  md:leading-[70px]'>
                    We help you choose, your right diagnosis partner.
                  </h1>
                  <p className='text_para'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to 
                  make a type specimen book.
                  </p>

                  <button className='btn'>Request an Appointment</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ===== Hero Section Ends ========= */}

      <section>
        <div className="container">
          <div className='lg:w-[740px] mx-auto'>
            <h2 className='heading text-center'>
              Providing the best diagnostic centers on a click.
            </h2>
            <p className='text-para text-center'>
              World-class care for everyone. Lorem ipsum.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            {/*find centers icon*/}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Center
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Lorem ipsum.
                </p>
  
                <Link to='/centers' className='w-[44px] h-[44px] rounded-full border border-solid
                borer-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor
                hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            {/*find location icon*/}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Location
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Lorem ipsum.
                </p>
  
                <Link to='/centers' className='w-[44px] h-[44px] rounded-full border border-solid
                borer-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor
                hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>


            {/*appointment icon*/}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Book an Appointment
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Lorem ipsum.
                </p>
  
                <Link to='/centers' className='w-[44px] h-[44px] rounded-full border border-solid
                borer-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor
                hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      <About/>


      {/* ===== Servive Section Starts ========= */}

      <section>
        <div className="container">
          <div className='xl:w[470px] mx-auto'>
            <h2 className='heading text-center'>Our Services</h2>
            <p className='text_para text-center'>
            Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry. 
            </p>
          </div>

          <ServiceList />
        </div>
      </section>

      {/* ===== Servive Section Ends ========= */}

    </>
  )
}

export default Home