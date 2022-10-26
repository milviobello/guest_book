        // Note : Use YOUR API_URL here !
        var API_URL = '';

        function compare(a, b) {
            const timeA = a.posted.toUpperCase();
            const timeB = b.posted.toUpperCase();
          
            var comparison = 0;
            if (timeA > timeB) {
              comparison = 1;
            } else if (timeA < timeB) {
              comparison = -1;
            }
            return comparison;
          }

        function displayPosts(data) {
            if (data && data.Items) {
                $("#entries").html('');
                var items = data.Items;
                var sorted = items.sort(compare);
                var i = 1;
                sorted.forEach(function(thePost) {
                    if (i == 1) {
                        $("#postedAfter").val(thePost.posted); // update the timestamp filter field
                        $("#msg").val(""); // clear the message field
                    }
                    $("#entries").append('<p>Posted : ' + thePost.posted + '<br />' + thePost.post + '</p>');
                    i += 1;
                });
                //if (items.length == 1) {
                //    $("#postedAfter").val(thePost.Posted);
                //}
            } else {
                alert('No Items found in data');
            }
        }

        function getPostsAfter(stamp) {
            var myUrl = API_URL + "?postedAfter=" + stamp;
            $("#entries").html('');
            $.ajax({
                type : 'GET',
                url : myUrl,
                success : function(data) {
                    displayPosts(data);
                }
            });
        }
        
         function postMessage() {
            
            alert("Post '" + $('#msg').val() + "' to API_URL = " + API_URL);
            
            $.ajax({
                type : 'POST',
                url : API_URL,
                data : JSON.stringify({"message" : $('#msg').val()}),
                contentType : 'application/json',
                success : function(data) {
                    displayPosts(data);
                }
            });
        };
