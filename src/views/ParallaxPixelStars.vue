<template>
  <div class="wrapper">
    <div class="stars"></div>
    <div class="stars"></div>
    <div class="stars"></div>
    <p>Parallax</p>
    <p>Pixel Stars</p>
  </div>
</template>

<style lang="scss" scoped>
@function make-stars($n) {
  $value: 0 0 #fff;
  @for $i from 1 through $n {
    $value: #{$value}, #{random(1000) / 10}vw #{random(2000) / 10}vh #fff;
  }
  @return $value;
}

$stars-large: make-stars(100);
$stars-medium: make-stars(200);
$stars-small: make-stars(600);
$anime-duration: 20s;

.wrapper {
  background-image: radial-gradient(
    ellipse at bottom,
    #1b2735 0%,
    #090a0f 100%
  );
  color: white;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  p {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 5px 5px #fff1;
  }

  .stars {
    position: absolute;
    background-color: transparent;
    top: 0;
    left: 0;
    border-radius: 50%;

    &::after {
      content: "";
      position: absolute;
      top: 100vh;
    }
  }

  .stars:nth-child(3) {
    height: 3px;
    width: 3px;
    box-shadow: $stars-large;
    animation: star-moves $anime-duration * 3 linear infinite;

    &::after {
      height: 3px;
      width: 3px;
      box-shadow: $stars-large;
    }
  }

  .stars:nth-child(2) {
    height: 2px;
    width: 2px;
    box-shadow: $stars-medium;
    animation: star-moves $anime-duration * 2 linear infinite;

    &::after {
      height: 2px;
      width: 2px;
      box-shadow: $stars-medium;
    }
  }

  .stars:nth-child(1) {
    height: 1px;
    width: 1px;
    box-shadow: $stars-small;
    animation: star-moves $anime-duration linear infinite;

    &::after {
      height: 1px;
      width: 1px;
      box-shadow: $stars-small;
    }
  }
}

@keyframes star-moves {
  from {
    transform: translateY(0);
    top: 0;
  }
  to {
    transform: translateY(-100%);
    top: -100vh;
  }
}
</style>
