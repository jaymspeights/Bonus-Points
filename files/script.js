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
    student.children(":last").children(".leftarrow").click(function(){
      $(this).next().val(function(i, oText){
        return parseInt(oText) - 1;
      });
    });
    student.children(":last").children(".rightarrow").click(function(){
      $(this).prev().val(function(i, oText){
        return parseInt(oText) + 1;
      });
    });
    student.children(":last").children(".sub").click(function(){
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

  $("#list").append(newClass);
  newClass.show();
}


//On Window Load
$(function(){
  $("#list").children().children("button").click(function(){
    $(this).next().next().toggle();
  });

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


  //request to give points
  $(".sub").click(function(){
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

  //request to delete a class
  $(".delete").click(function(){
    let node = $(this);
    let code = $(this).next().children("#code").html();
    $.post("/student/delete", code, function(data, status){
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

});
