# Qualtics Related Code and Notes


## GeoCoding with geocoder.js

In its current form, the geocoder.js code, with the 
addition of your own Google Maps API key, will 

* pop over a Google Map when triggered
* attempt to geocode a concatenation of the first 5 fields
* place a drag-and-droppable marker on the geocoded latitude and longitude
* fill text fields 'Latitude' and 'Longitude' with those from map

If a marker isn't visible due to a failed geocode or empty
input fields, one will be shown by clicking on the map.
This marker can be moved by dragging the visible marker
or simply by clicking on another position.
Each time the marker is placed, the Qualtrics question
choices with the variable names 'Latitude' and 'Longitude'
are updated with the appropriate values.
Clicking the button at the bottom of the map simply
makes the map go away.  If the map is triggered again,
it will overwrite the existing latitude and longitude.
(This could probably be dealt with but was not desired.)

Therefore, in its current state, this code requires ...

* the question text to include a link to start the process `<a href="javascript:void(0)" onclick="showGoogleMap();">show map</a>`
* a google map v3 api key added to the javascript
* at least 5 text fields (to be used as address)
* a text field after the 5th called 'Latitude'
* a text field after the 5th called 'Longitude'

This appears to work on my Mac Pro running 10.6.8 in Firefox and Chrome,
as well as a Windows machine of unknown OS running Chrome.



## Examples


* [The example question](example_question_1.png)
* [Click the gear menu and add javascript](example_question_2.png)
* [Enter this javascript with YOUR API KEY](example_question_javascript.js)
* [Edit the question](example_question_3_normal_view.png)
* [Switch to HTML view](example_question_4_html_view.png)
* [Add this HTML with link](example_question_html.html)
* [A preview with address](example_question_5_preview_before_map.png)
* [the map pop over](example_question_6_preview_with_map.png)
* [The question with latitude and longitude](example_question_7_preview_after_map.png)

