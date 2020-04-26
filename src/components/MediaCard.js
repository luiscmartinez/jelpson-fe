import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 345
  },
  media: {
    height: 140
  }
})

export default function MediaCard({ business, handlePagination }) {
  const classes = useStyles()
  const { image_url, name, categories } = business
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image_url}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {categories.map((category, i) => {
              const { alias, title } = category
              return (
                <div
                  key={i}
                  className='category'
                  onClick={() => {
                    handlePagination(0, alias, true)
                  }}
                >
                  {title}
                </div>
              )
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
