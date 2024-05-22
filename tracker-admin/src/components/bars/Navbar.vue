<script setup>
  defineProps({
      active: {
          type: String,
          required: true
      },
      subactive: {
          type: String,
          required: false
      }
  })
  function getActive(val, curr){
      if(val == curr){
          return "active";
      } else {
          return "";
      }
  }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/map">Map</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/manage">Manage</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Trip</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">My Profile</a>
                </li>
                <li class="nav-item dropdown">
                    <div class="btn-group dropup">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Related Apps
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Checkout</a></li>
                            <li><a class="dropdown-item" href="#">GudangKu</a></li>
                            <li><a class="dropdown-item" href="#">PinMarker</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">MI-FIK</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
</template>

<style>
    .navbar {
        width: 100%;
        position: fixed;
        bottom: 0;
        background: var;
    }
    a.nav-link {
        color: var(--whiteColor) !important;
        font-weight: 500;
    }
</style>