# "Simple Post Management App"

----------

npm uninstall @fortawesome/fontawesome-svg-core @emotion/styled @emotion/react

    "fuse.js": "^6.6.2",
    
    "@mui/icons-material": "^5.14.8",
    "@mui/material": "^5.14.8",

    npm install @mui/material @emotion/styled @emotion/react @mui/icons-material

👋 Hello, I'm Sathyanarayanan.

**Front End Technologies Used : React.JS, Material-UI** 
 
Use case : To design a Simple Post Management Page.
 
* On the first page load, it will call https://jsonplaceholder.typicode.com/posts and take the posts in memory. Then display each post in a MUI Card.
* On Clicking a Post, a Dialog box will popup with the Comments (https://jsonplaceholder.typicode.com/posts/${post_id}/comments).
* Each post have a Delete Button that delete the post.
* There is a Search box on the top of the navbar and using that we can fuzzy search the posts and see the results.
* This whole state has been saved Internally on the Browser.

* For example :
>> If we type ‘hello’ in search box, the below cards will only have items which have ‘hello’ in it.
>> On Clicking the BROWSER’s REFRESH button or F5 the Page will Reload and comeback to the same state as of having hello in the search box and with previous ‘hello‘ results.
 
* There is a Button Refresh State
>> By clicking on it will clear the local state, get data from the API and display the contents.
**Note**:  After the First API Call, no other API call is initialized. Everything have been be done Internally like filtering for search etc., until we click the Refresh State Button.
 
* After clicking the Delete Button, it will delete the post & Queue up DELETE API request on the Local. i.e., The API request will not be sent out. It will be Queued up.

* Like on Clicking Delete on 3 cards the Delete queue will have 3 items. It shows an indicator on the screen to represent how many API calls are queued up ( just a number ).

* E.g., DELETE QUEUE 3 - This Delete Queue also be persisted across Refresh - Upon Clicking the Refresh State button The Delete Queue will be Fired and Queue will be Emptied as the Request are Actualized .