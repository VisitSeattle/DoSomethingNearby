<template>
  <b-container
    class="video-grid"
    cols="12"
  >
    <b-row
      no-gutters
    >
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <b-img
          alt=""
          fluid-grow
          src="~/static/assets/grid/do_something_shop.svg"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <modal-grid-card
          business-name="Urban Sprouts, Renton"
          business-name-alt="A woman wearing a face covering tends to her plant shop."
          business-img="/assets/grid/PT_UrbanSprouts.jpg"
          business-video="//www.youtube.com/embed/76jDLlQK9Ak?enablejsapi=1"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <b-img
          alt=""
          fluid-grow
          src="~/static/assets/grid/do_something_drink.svg"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <modal-grid-card
          business-name="Damsel Cellars, Woodinville"
          business-name-alt="A server with gloves and a face covering attends to customers at a wine tasting."
          business-img="/assets/grid/PT_DamselCellars.jpg"
          business-video="//www.youtube.com/embed/6lw1UQH0ks8?enablejsapi=1"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <b-img
          alt=""
          fluid-grow
          src="~/static/assets/grid/do_something_luggage.svg"
        />
      </b-col>
      <!-- Middle -->
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <modal-grid-card
          business-name="Musang, Beacon Hill"
          business-name-alt="A woman with a face covering prepares a stir-fry dish in a restaurant kitchen."
          business-img="/assets/grid/PT_Musang.jpg"
          business-video="//www.youtube.com/embed/ZMESddRGh4w?enablejsapi=1"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <b-img
          alt=""
          fluid-grow
          src="~/static/assets/grid/do_something_eat.svg"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <modal-grid-card
          business-name="KJ’s Cakery Bakery, Kent"
          business-name-alt="Three women with masks and aprons preside over their bakery."
          business-img="/assets/grid/PT_KJsCakeryBakery.jpg"
          business-video="//www.youtube.com/embed/URV0ldh9OuM?enablejsapi=1"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <b-img
          alt=""
          fluid-grow
          src="~/static/assets/grid/do_something_guitar.svg"
        />
      </b-col>
      <b-col
        class="video-grid__column"
        md="auto"
      >
        <modal-grid-card
          business-name="Mr. Naturalz Salon, Renton"
          business-name-alt="A barber cuts a client's hair. Both are masked up."
          business-img="/assets/grid/PT_MrNaturalzSalon.jpg"
          business-video="//www.youtube.com/embed/N5puDmf40tQ?enablejsapi=1"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalGridCard from '@/components/modules/ModalGridCard.vue'

export default {
  components: {
    ModalGridCard
  }
}
</script>
<style lang="sass" scoped>
.video-grid
  &__column
    width: 50%
    @for $i from 1 through 10
      &:nth-child(#{$i})
        @if (($i + 1) % 4 == 0)
          order: $i + 1
        @else if ($i % 4 == 0)
          order: $i - 1
        @else
          order: $i

  +media-breakpoint-up(lg)
    &__column
      width: 20%

      &:nth-child(1n)
        order: 0

</style>
