Special thanks to [https://github.com/virajg224](https://github.com/virajg224) for sticking with the project from start to the end of summer! Looking forward to continue working and making this a useable product some day.

# Production

[Contrail Alpha v1.0.1](https://contrail-fbase.web.app) is out! Please feel free to log any bugs/issues/suggestions.

Quickly and conveniently share files with coworkers, classmates, friends or family using our user-friendly interface!
### Securely upload files to Contrail
![alt text](https://github.com/1298se/Contrail-Web/blob/master/demo/upload.png)
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/upload_complete.png)

### Favourite them for easy access
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/favourite.png)

### Share files with collaborators
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/share_search.png)
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/share_select.png)
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/view_collab.png)

### Download for use
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/download.png)

### Delete them if uneeded
![alt_text](https://github.com/1298se/Contrail-Web/blob/master/demo/permanent_delete.png)
 
# Development

Created using
  - React
  - Node.js/Express
  - Firebase
  - GCP Cloud Storage 

```
Contrail-Web
│   README.md
|   .gitignore 
│   package.json
└─── contrail-api
|        |
|        └─── functions
|                 |
|                 └─── index.js <--- main express app
|                 └─── actions
└───                |
|                   └─── resource.js <--- endpoint functions
|                   | ...
└───Contrail-UI     
    │   
    └── src
         └── components <-- app ui components
         └── firebase <-- firebase and firebase controllers
         └── http <-- client-side http response text
         └── store <-- redux store
         └── types <-- global types
         └── utils
```
# Upcoming features
Although the direction of the project is flexible, the development team has planned for the website to mainly function as a note-sharing tool. Future features will include:
  - Upload hand-written notes and convert them into editable .docx files
  - In-app editing
  - Search capabilities
  - User profiles
