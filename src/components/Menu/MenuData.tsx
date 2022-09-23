import {
  MdSettings,
  MdSupervisedUserCircle,
  MdSwapVerticalCircle,
  MdScreenShare,
  MdOutlineLogout,
} from 'react-icons/md'

const MenuData = [
  { title: 'Main', icon: <MdScreenShare />, path: '/', action: null },
  { title: 'Settings', icon: <MdSettings />, path: '/settings', action: null },
  {
    title: 'Users',
    icon: <MdSupervisedUserCircle />,
    path: '/users',
    action: null,
  },
  {
    title: 'Change user',
    icon: <MdSwapVerticalCircle />,
    path: '/pin',
    action: null,
  },
  {
    title: 'Logout',
    icon: <MdOutlineLogout />,
    path: '/logout',
    action: null,
  },
]

export default MenuData
