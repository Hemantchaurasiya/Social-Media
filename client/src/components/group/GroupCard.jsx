import {useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";
import apiInstance from '../../http';
import { useSelector} from 'react-redux';

function GroupCard({group}) {
    const [Url, setUrl] = useState();
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${group.photo}`))
            .then((url) => {
              setUrl(url);
            })
            .catch((error) => {
              console.log(error)
            });
      }, [group]);

    const LikeHandle = async()=>{
        try {
            const {data} = await apiInstance.put(`group/like/${group._id}`,{userId:user._id});
        } catch (error) {
            console.log(error);
        }
    }

    const JoinHandle = async()=>{
        try {
            const {data} = await apiInstance.put(`group/join/${group._id}`,{userId:user._id});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card key={group._id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={Url} alt="" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {group.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {group.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
        <Button onClick={LikeHandle} size="small">Like</Button>
        <Button onClick={JoinHandle} size="small">Join</Button>
      </CardActions>
        </Card>
    )
}

export default GroupCard;
