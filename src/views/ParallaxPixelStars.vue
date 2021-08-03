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
    $value: #{$value}, #{random(1000) / 10}vw #{random(1000) / 10}vh #fff;
  }
  @return $value;
}

$stars-large: 100;
$stars-small: 25;
$stars-ratio: (1, 2, 6);
$anime-duration: 40s;

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

  .stars:nth-child(1) {
    height: 3px;
    width: 3px;
    animation: star-moves $anime-duration * 3 linear infinite;

    &::after {
      height: 3px;
      width: 3px;
    }
  }

  .stars:nth-child(2) {
    height: 2px;
    width: 2px;
    animation: star-moves $anime-duration * 2 linear infinite;

    &::after {
      height: 2px;
      width: 2px;
    }
  }

  .stars:nth-child(3) {
    height: 1px;
    width: 1px;
    animation: star-moves $anime-duration linear infinite;

    &::after {
      height: 1px;
      width: 1px;
    }
  }

  @for $i from 1 through 3 {
    .stars:nth-child(#{$i}),
    .stars:nth-child(#{$i})::after {
      box-shadow: make-stars($stars-large * nth($stars-ratio, $i));
    }
  }

  @media screen and (max-width: 580px) {
    @for $i from 1 through 3 {
      .stars:nth-child(#{$i}),
      .stars:nth-child(#{$i})::after {
        box-shadow: make-stars($stars-small * nth($stars-ratio, $i));
      }
    }
  }
}

@keyframes star-moves {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -100vh, 0);
  }
}
</style>
