# React Movie Database

Create api for a movie-list aplplication.

## Routes

| Route | HTTP Verb | Post Body | Description |
|------|---------|----------|---------|
| /api | `GET` | - | List all movies. |
| /api/add-movie | `POST` | {'title':'foo',<br> 'movieImage':'url' + '/public/' + 'filename', <br>'category':'action', 'date':2010,<br> 'actors':'Doe John, Derp Chan',<br> 'rating': 9.5 } | Create a new movie. |
| /api/find-movie/:id | `GET` | - | Get a movie. |
| /api/delete-movie/:id | `DELETE` | - | Delete a movie. |
| /api/update-movie/:id | `PUT` | {'title':'foo',<br> 'category':'action', 'date':2010,<br> 'actors':'Doe John, Derp Chan',<br> 'rating': 9.5 } | Update a movie with new info. |

### Bug

- For `/api/update-movie/:id` currently cannot use to update any image of each item.
