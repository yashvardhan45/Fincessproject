(function () {
  let finsterCourses = document.querySelectorAll(".finster-course")

  // Set width of overflowing ul element
  let setIndWidth = (finsterCourse) => {
    let indicators = finsterCourse.querySelector(".carousel-indicators")
    indicators.style.width = `${94 * indicators.dataset.num + 18}px`
  }

  // Invoked when carousel starts sliding
  let beforeCourseSlide = async (event) => {
    // Wait for 200ms to let the active frame change
    setTimeout(() => {

      // Calculate the active frame position
      setInitialControlHeight(event.target)
      let box = event.target.querySelector(".carousel-indicators-scroll")
      let ind = box.querySelector(".active")
      let indRect = ind.getBoundingClientRect()
      let boxRect = box.getBoundingClientRect()
      let boxMidX = boxRect.width / 2
      let indMidX = indRect.x - boxRect.x + indRect.width / 2

      // Scroll the indicator box to bring active frame to center
      box.scrollBy({
        top: 0,
        left: indMidX - boxMidX,
        behavior: 'smooth'
      })
    }, 200);
  }

  // Set initial control height Function
  let setInitialControlHeight = (finsterCourse = null) => {
    // This condition resizes controls of only the carousel in transition
    if (finsterCourse) {
      // Interval is set for allowing the image to load
      let interval = setInterval(() => {
        let height = finsterCourse.querySelector(".active .finster-img-md-a img").clientHeight
        // When the image gets loaded the size is not 0 and now we can clear the interval and fix the height
        if (height != 0) {
          clearInterval(interval)
          finsterCourse.querySelectorAll(".carousel-control").forEach(control => { control.style.height = `${height + 2}px` })
        }
      }, 500);
    }
    // This condition resizes controls of all the carousels
    else {
      finsterCourses.forEach(finsterCourse => {
        let interval = setInterval(() => {
          let height = finsterCourse.querySelector(".active .finster-img-md-a img").clientHeight
          if (height != 0) {
            clearInterval(interval)
            finsterCourse.querySelectorAll(".carousel-control").forEach(control => { control.style.height = `${height + 2}px` })
          }
        }, 500);
      })
    }
  }

  // Set control height Function
  let setControlHeight = () => {
    finsterCourses.forEach(finsterCourse => {
      let height = finsterCourse.querySelector(".active .finster-img-md-a img").clientHeight
      finsterCourse.querySelectorAll(".carousel-control").forEach(control => { control.style.height = `${height + 2}px` })
    })
  }

  setUpFinsterCourses = () => {
    // For each finster courses
    finsterCourses.forEach(finsterCourse => {
      // Set width of overflowing ul element
      setIndWidth(finsterCourse)
      // Add event listener for finster slide event, to recenter the active frame
      finsterCourse.addEventListener('slide.bs.carousel', beforeCourseSlide)
      // Initial centering of active frame
      beforeCourseSlide({ "target": finsterCourse })
      // Set arrow height
      setInitialControlHeight()
      // Set arrow height on resize
      window.addEventListener('resize', setControlHeight)
    });
  }

  window.addEventListener('load', setUpFinsterCourses)
})()