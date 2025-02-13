The interval tree structure stores a set of intervals and returns for any query key all the intervals that contain this query value. The structure is in a way dual to the one-dimensional range queries, they keep track of a set of values and return for a given query interval all key values in that interval, whereas we now have a set of intervals as data and a key value as query.

Steps to Run the Project:
1. Open Index.html file in any web browser.
2. In the first Text box, Enter intervals space seperated.
	Example: intervals [2,5] and [6,8] should be entered as| 2 5,6 8 |and so on.
3. Press the Button Add Intervals to Build the tree. This is a static data structure so all the intervals need to be entered at once. Refresh the page to create a new tree.
4. the tree can be viewed below can also be zoomed in or out for ease of viewing.
5. In the Second Textbox enter the query key and press Find Button.
6. The Objects returned will be displayed on the bottom and the path followed will also be highlighed as the node visited will change the color.

THANK YOU!