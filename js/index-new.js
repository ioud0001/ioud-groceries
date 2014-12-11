/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var status; 
var list;
var myList = []; 

var input;
var label; 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		app.receivedEvent('deviceready', function(ev){
			
			if(localStorage.getItem("ioud0001-groceries")){
    		myList = JSON.parse(localStorage.getItem("ioud0001-groceries"));
			var buttons = document.getElementById("buttons");
			var button = document.createElement("button");
			button.setAttributes("id", "btnClear");
			button.value = "Clear Local Storage"; 
			buttons.appendChild(button);
			
    		showList();
  			}
		});

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id); 
        console.log('Received Event: ' + id);
		var newItem;
		var quantity;
		var quantityArray = [];
		
		document.querySelector("#btnAdd").addEventListener("click", function(ev){
ev.preventDefault();
    				newItem = document.querySelector("#item").value;
					
   					quantity = document.getElementById("quantity").value;
					
					if (quantity != "" && newItem != "")
					{
					 document.querySelector(".message").innerHTML = "";
					 var i = myList.length - 1;
					 var output = document.querySelector(".output");
  					output.innerHTML = "";
  					document.querySelector(".list").innerHTML = "";
						myList.push(newItem);
						for (var a = myList.length - 1; a < myList.length; a++)
					{
					myList[a] = myList[a] + " <span class='amount'>" + quantity + "</span>"; 
					}
					var ul = document.createElement("ul"); 
					ul.setAttribute("class", "listview");
					 for(var i=0;i<myList.length;i++){
    					
						//var li = document.createElement("li");
						var li = document.createElement("li");
						
						li.setAttribute("onClick", "removeThis('" + i + "')");
						//li.setAttribute("class", "listview");
						li.setAttribute("id", i);
						li.innerHTML = myList[i];
						ul.appendChild(li);
    					output.appendChild(ul);
						
						quantity = "";
 						}
					 
    				localStorage.setItem("ioud0001-groceries", JSON.stringify(myList) );
					
					i = "";
					document.querySelector("#item").value = "";
					document.querySelector("#quantity").value = "";
					}// end of if validation
					else
						document.querySelector(".message").innerHTML = "<p>Please add something to the list!</p>";
				}, false);
			
	}
	
  
}
function clearAll(){
  //clear out local storage
  localStorage.clear();
  var output = document.querySelector(".output");
  output.innerHTML = "Nothing in localStorage";
}

// call this function with the unique list item id and remove the unique item 
function removeThis(groceryitem){
myList.splice(groceryitem, 1);
showList();
}

function showList(ev){
  var output = document.querySelector(".output");
  output.innerHTML = "";
  document.querySelector(".list").innerHTML = "";
  var ul = document.createElement("ul");
  ul.setAttribute("class", "listview");
  for(var i=0;i<myList.length;i++){
    var li = document.createElement("li");
    li.innerHTML = myList[i];
	li.setAttribute("onClick", "removeThis('" + i + "')");
	ul.appendChild(li);
    output.appendChild(ul);
	
	
  }
}
app.initialize();