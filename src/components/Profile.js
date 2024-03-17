import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import useGetProfile from '../hooks/useGetProfile';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
  const {user , profile } = useSelector(store=>store.user);
  const {id} = useParams();
    useGetProfile(id);
    const dispatch = useDispatch
    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            //unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}` , {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }else{
            //follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}` , {id:user?._id});
                console.log(res);
                toast.success(res.data.message);
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }
    }

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
        <div>
            <div className='flex items-center py-2'>
                <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                    <IoMdArrowBack size="24px"/>
                </Link>
            <div className='ml-2'>
                <h1 className='font-bold text-lg'>{profile?.name}</h1>
                <p className='text-gray-500 text-sm'>10 post</p>
            </div>
        </div>
            <img src="https://wallpapers.com/images/high/technology-linkedin-background-dce01jsbpnn0z2ej.webp" alt="banner"/>
            <div className='absolute top-64 ml-2 border-4 border-white rounded-full '>
                <Avatar src="https://pbs.twimg.com/profile_images/1768296861994287104/XLdZV8vG_400x400.jpg" size="120" round={true} />
            </div>
            <div className='text-right m-4'>
            {
                profile?._id === user?._id ? (
                    <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                ):(
                    <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow" }</button>
                )
            }

                
            </div>
            <div className='m-4'>
                <h1 className='font-bold text-xl'>{profile?.name}</h1>
                <p>{`@${profile?.username}`}</p>
            </div>
            <div className='m-4 text-sm'>
                <p>"Passionate 💻 coder and tech enthusiast 🚀. Transforming ideas into elegant solutions, one line of code at a time. Constantly learning 📚 and exploring the ever-evolving world of technology. #CodeIsLife #TechEnthusiast"</p>
            </div>
        </div>
    </div>
  )
}

export default Profile