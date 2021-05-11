<template>
  <v-card
      class=" ma-2"
      max-width="350"
      :to="link"
  >
    <v-img
        class="white--text align-end"
        height="200px"
        :src="require(`../../assets/${image}.jpg`)"
    >
      <v-card-title class="ma-0 pa-0">
        <v-sheet color="rgba(255, 255, 255, 0.8)" width="100%" class="pa-2">
        <v-icon left class="ma-1">
          {{icon}}
        </v-icon> <span class="text-uppercase">{{word}}</span>
        </v-sheet>
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      <b>{{title}}</b>
    </v-card-subtitle>
    <v-card-text>

      <p>{{text}}</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon class="mr-1">
          mdi-cart
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Service extends Vue {
  @Prop({default: "mdi-atom-variant"}) icon!: string
  @Prop({default: ""}) title!: string
  @Prop({default: ""}) text!: string
  @Prop() link!: string
  @Prop({default: "white"}) color!: string
  @Prop() image!:string
  @Prop() word!:string

  get foto() {
    const foto = `@/assets/${this.image}.jpg`
    console.log(foto)
    return foto
  }
}
</script>