<template>
  <b-dropdown
    id="dropdown-sort"
    :text="dropdownLabel"
    variant="primary"
    right
    class="mr-0"
  >
    <b-dropdown-item
      id="alphabetical"
      @click="(event) => onDropdownClick(event, this.optionIds.alphabetical)"
      :active="activeId === this.optionIds.alphabetical"
    >
      A-Z
    </b-dropdown-item>
    <b-dropdown-item
      id="dateAdded"
      @click="(event) => onDropdownClick(event, this.optionIds.dateAdded)"
      :active="activeId === this.optionIds.dateAdded"
    >
      Date added
    </b-dropdown-item>
    <b-dropdown-item
      v-if="showNearMeOption"
      id="nearMe"
      @click="(event) => onDropdownClick(event, this.optionIds.nearMe)"
      :active="activeId === this.optionIds.nearMe"
    >
      Near me
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  data () {
    return {
      optionIds: {
        alphabetical: 'alphabetical',
        dateAdded: 'dateAdded',
        nearMe: 'nearMe'
      },
      optionLabels: {
        alphabetical: 'A-Z',
        dateAdded: 'Date added',
        nearMe: 'Near me'
      },
      internalSelectedSort: '',
      previousSelectedId: null,
      hasLocationPermission: null,
      dropdownLabel: 'Sort by',
      activeId: '',
      showNearMeOption: false
    }
  },
  mounted () {
    this.internalSelectedSort = this.selectedSort
    this.previousSelectedId = this.internalSelectedSort
    // Check for Geolocation support
    if (!navigator.geolocation) {
      this.showNearMeOption = false
    }
    if (navigator && navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          this.showNearMeOption = true
        } else if (result.state === 'prompt') {
          this.showNearMeOption = true
        }
      })
    } else {
      this.showNearMeOption = true
    }
  },
  computed: {
    ...mapGetters({
      selectedSort: 'sort/selectedSort'
    })
  },
  methods: {
    ...mapActions({
      setSelectedSort: 'sort/setSelectedSort',
      setUserPosition: 'sort/setUserPosition',
      setGeolocationError: 'sort/setGeolocationError'
    }),
    hasLocation () {
      return false
    },
    onDropdownClick (event, selectedId) {
      this.setActiveSelectedId(selectedId)
    },
    setActiveSelectedId (selectedId) {
      this.activeId = selectedId
      this.dropdownLabel = this.optionLabels[selectedId]
      if (selectedId === this.optionIds.nearMe) {
        if (!this.hasLocationPermission) {
          if (this.hasLocationPermission === null) {
            var geoOptions = {
              timeout: 10 * 1000,
              maximumAge: 10 * 60 * 1000
            }
            navigator.geolocation.getCurrentPosition(this.onGetCurrentPosition, this.onErrorGetCurrentPosition, geoOptions)
          }
          Vue.nextTick(() => {
            // DOM updated
            this.internalSelectedSort = this.previousSelectedId
            this.previousSelectedId = this.internalSelectedSort
          })
        } else {
          this.setSelectedSort(selectedId)
          this.previousSelectedId = selectedId
        }
      } else {
        this.setSelectedSort(selectedId)
        this.previousSelectedId = selectedId
      }
    },
    onGetCurrentPosition (position) {
      this.hasLocationPermission = true
      const { latitude, longitude } = position.coords
      this.setUserPosition({ latitude, longitude })
      this.internalSelectedSort = this.optionIds.nearMe
      this.setSelectedSort(this.optionIds.nearMe)
    },
    onErrorGetCurrentPosition (error) {
      // TODO: Handle error gracefully
      console.error(error)
      let errorMessage = "We couldn't access your location"
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "We don't have your permission to access your location"
          break
      }
      this.setGeolocationError(errorMessage)
      this.hasLocationPermission = false
      this.showNearMeOption = false
      // Go back to previous selected
      this.setActiveSelectedId(this.previousSelectedId)
    }
  }
}
</script>
