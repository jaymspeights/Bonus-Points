"use strict";

//Called when a class needs to be added to the window
function loadTeacherClass(data){
  let newClass = $("#temp").clone();
  newClass.attr("id","");
  newClass.children("button:first").html(data.name);
  newClass.children(".hide").children(":first").html(data.code);

  //adds each student to the tree and assigns onclick methods
  for (let i in data.student) {
    let student = $("#tempStudent").clone();
    let node = student.children(":first");
    node.html(data.student[i].name);
    node.next().html(data.student[i].points);
    newClass.children(".hide").append(student);
    student.show();

    listenLeftClick(student);
    listenRightClick(student);
    listenSubmit(student);
  }

  listenToggle(newClass);
  listenDelete(newClass);

  $("#list").append(newClass);
  newClass.show();
}



//called to load student class files
function loadStudentClass(data){
  let newClass = $("#temp").clone();
  newClass.attr("id","");
  newClass.children("#toggleclass").html(data.name);
  newClass.children(".hide").children("#teachername").html(data.teacher);
  newClass.children(".hide").children("#points").html(data.points);
  newClass.show();
  $("#list").append(newClass);

  listenToggle(newClass);
  listenDelete(newClass);
}


//listener for left arrow
function listenLeftClick(student){
  student.children(".pointcontrol").children(".leftarrow").click(function(){
    $(this).next().val(function(i, oText){
      return parseInt(oText) - 1;
    });
  });
}

//listener for right arrow
function listenRightClick(student){
  student.children(".pointcontrol").children(".rightarrow").click(function(){
    $(this).prev().val(function(i, oText){
      return parseInt(oText) + 1;
    });
  });
}

//listener for submit button
function listenSubmit(student){
  student.children(".pointcontrol").children(".sub").click(function(){
    let pointholder = $(this).parent().prevAll(".points");
    let points = $(this).prevAll(".bonusinput").val();
    let student = $(this).parent().prevAll(".name").html();
    let code = $(this).parent().parent().prevAll("#code").html();
    let data = {"points": points, "student": student, "class": code}
    $.post("/teacher/give", data, function(data, status){
      if (status == "success"){
        pointholder.html(function (i, oText){
          return (parseInt(oText) + parseInt(points));
        });
      }

      else if (status == 500){
        console.log(status);
        window.alert("Internal Server Error. Please try again later.");
      }

      else{
        console.log(status);
      }
    });
  });
}

//listener for toggling class
function listenToggle(newClass){
  newClass.children("#toggleclass").click(function(){
    $(this).siblings(".hide").toggle();
  });
}

//listener for deleting class
function listenDelete(newClass){
  newClass.children(".delete").click(function(){
    let node = $(this);
    let code = $(this).siblings(".hide").children("#code").html();
    $.post("/teacher/delete", code, function(data, status){
      if (status == "success"){
        node.parent().remove();
      }

      else if (status == 500){
        console.log(status);
        window.alert("Internal Server Error. Please try again later.");
      }

      else{
        console.log(status);
      }
    });
  });
}


//On Window Load
$(function(){
  
  $("#menu").click(function(){
    $(this).next().toggle();
  });


  //request to join a class
  $("#join").click(function(){
    let code = $("code").value;
    $.post("/student/join", code, function(data, status){
      if (status == "success"){
        let newClass = $("#temp").clone();
        newClass.children("button:first").html("Class " + ($("#list").children().length + 1));
        newClass.show();
        $("#list").append(newClass);
        newClass.children("button").click(function(){
          $(this).next().next().toggle();
        });
        newClass.children(".delete").click(function(){
          let node = $(this);
          let code = $(this).next().children("#code").html();
          $.post("/teacher/delete", code, function(data, status){
            if (status == "success"){
              node.parent().remove();
            }
            else if (status == 500){
              console.log(status);
              window.alert("Internal Server Error. Please try again later.");
            }
            else{
              console.log(status);
            }
          });
        });
      }
      else if (status == 400){
        console.log(status);
        window.alert("Please enter a valid class code");
      }
      else if (status == 500){
        console.log(status);
        window.alert("Internal Server Error. Please try again later.");
      }
      else{
        console.log(status);
      }
    });
  })


  //request to create a class
  $("#create").click(function(){
    let name = $("#name").val();
    $.post("/teacher/create", name, function(data, status){
      if (status == "success"){
        let newClass = $("#temp").clone();
        newClass.children("button:first").html(name);
        newClass.show();
        $("#list").append(newClass);
        newClass.children("button").click(function(){
          $(this).next().next().toggle();
        });
        newClass.children(".delete").click(function(){
          let node = $(this);
          let code = $(this).next().children("#code").html();
          $.post("/teacher/delete", code, function(data, status){
            if (status == "success"){
              node.parent().remove();
            }
            else if (status == 500){
              console.log(status);
              window.alert("Internal Server Error. Please try again later.");
            }
            else{
              console.log(status);
            }
          });
        });
      }
      else if (status == 400){
        console.log(status);
        window.alert("Please enter a valid class code");
      }
      else if (status == 500){
        console.log(status);
        window.alert("Internal Server Error. Please try again later.");
      }
      else{
        console.log(status);
      }
    });
  })
});
