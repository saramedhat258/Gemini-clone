import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'
function Sidebar() {
    const [Extended, setExtended] = useState(false)
    const { prevPrompts, setRecentPrompt, onsent, newchat } = useContext(Context)
    const loadprompt=async (prompt)=>{
        setRecentPrompt(prompt)
        await onsent(prompt)
    }
    return (
        <>
            <div className={`sidebar ${Extended ? 'extentedmenu' : 'notextended'} justify-content-between flex-column`}>
                {/* top sidebar ////////////////////////////////////////////////////////////////// */}

                <div className="top-sidebar mt-4">
                    <img src={assets.menu_icon} className='sidebar-icon mx-3' onClick={() => setExtended(prev => !prev)} alt="" />
                    <div onClick={() => newchat()} className={`newchat d-flex gap-1 align-items-center  ${Extended ? 'rounded-pill ms-3 px-3 ' : 'rounded-circle mx-2'} `}>
                        <img src={assets.plus_icon} className={`sidebar-icon ${Extended ? '' : 'm-auto my-2'} `} alt="" />
                        {Extended ? <p className='pt-3'>New Chat</p> : null}
                    </div>
                    {Extended ?
                        <div className='recent-box mt-3'>
                            <p className='ms-3 mt-5'>Recent</p>
                            {
                                prevPrompts.map((item,index) => {
                                    return (
                                        <div onClick={()=>loadprompt(item)} key={index} className="recent-msg d-flex gap-2 w-70 align-items-center ms-3 rounded-pill px-3">
                                            <img src={assets.message_icon} className='sidebar-icon' alt="" />
                                            <p className='pt-2'>{item.slice(0,18)}...</p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        : null
                    }
                </div>

                {/* bottom sidebar /////////////////////////////////////////////////////////////// */}

                <div className="bottom-sidebar mb-5">
                    <div className={`bottom-box d-flex gap-3  align-items-center ${Extended ? 'rounded-pill ms-3 w-75' : 'rounded-circle p-2 mx-3 w-50'}  px-2 py-2`}>
                        <img src={assets.question_icon} alt="" className="sidebar-icon" />
                        {Extended ? <p className='my-auto'>Help</p> : null}
                    </div>
                    <div className={`bottom-box d-flex gap-3  align-items-center ${Extended ? 'rounded-pill ms-3 w-75' : 'rounded-circle p-2 mx-3 w-50'} px-2 py-2`}>
                        <img src={assets.history_icon} alt="" className="sidebar-icon" />
                        {Extended ? <p className='my-auto'>Activity</p> : null}
                    </div>
                    <div className={`bottom-box d-flex gap-3  align-items-center ${Extended ? 'rounded-pill ms-3 w-75' : 'rounded-circle p-2 mx-3 w-50'} px-2 py-2`}>
                        <img src={assets.setting_icon} alt="" className="sidebar-icon" />
                        {Extended ? <p className='my-auto'>Settings</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar