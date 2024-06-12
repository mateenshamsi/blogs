import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

export default function ActionAreaCard({ title, description, image, link }) {
  return (
    <Link to={`/post/${link}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, height: 345, borderRadius: '20px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" sx={{ color: 'grey', borderRadius: '20px' }}>Learn More</Button>
        </CardActions>
      </Card>
    </Link>
  );
}
