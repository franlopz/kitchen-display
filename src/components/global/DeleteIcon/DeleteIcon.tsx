import { FC } from 'react'
import { IconBaseProps } from 'react-icons'
import { MdDelete } from 'react-icons/md'
import styles from './DeleteIcon.module.css'

const DeleteIcon: FC<Omit<IconBaseProps, 'className'>> = ({ ...props }) => {
  return <MdDelete {...props} className={styles['delete-icon']} />
}

export default DeleteIcon
