import { 
  Avatar,
  Tag
} from "@chakra-ui/react";
import { NextPage } from "next";
import styles from './avatar.module.css'; 

interface Props {
  name: string;
  className?: string;
  image?: string;
}

const AvatarMatchLayout: NextPage<Props> = ({name, image, className}) => {

  return (
    <div 
      className={`${styles.container} ${className}`}
    >
      <Avatar
        size='lg'
        className={styles.avatar}
        name={name} 
        src={image ? image : 'https://bit.ly/tioluwani-kolawole'}
      />
      <Tag>{name}</Tag>
    </div>
  )
}

export default AvatarMatchLayout;
