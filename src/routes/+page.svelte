<script>
    import Navbar from "../components/Navbar.svelte";
    import Mural from "../components/Mural.svelte";
    import About from "../components/About.svelte";
    import Rewards from "../components/Rewards.svelte";
    import HomeIntroduction from "../components/HomeIntroduction.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="noise bgblur fixed -z-10 table h-full w-full bg-repeat"></div>

<!-- <div class="absolute top-0 left-0 z-10 w-full"> -->
<Navbar />
<!-- </div> -->

<main class="z-10">
    <Mural />
    <About />
    <Rewards />
    <HomeIntroduction />
</main>

<footer>
    <Footer />
</footer>

<style>
    .bgblur {
        backdrop-filter: blur(80px);
    }
</style>
