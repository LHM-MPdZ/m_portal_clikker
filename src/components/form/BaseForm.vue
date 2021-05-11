<template>
  <v-form
      ref="form"
      style="margin-bottom: 3rem"
  >
    <v-form-base
        class="mb-4"
        :model="model"
        :schema="parsedSchema"
        @input="modelChanged"
    />
    <v-flex
        v-if="!buttonsDisabled"
        class="buttonGroup d-flex row align-center flex-row-reverse"
    >
      <loading-button
          :is-loading="isCompleting"
          :has-error="hasCompleteError"
          color="primary"
          @on-click="completeForm"
      >
        {{ buttonText }}
      </loading-button>
    </v-flex>
  </v-form>
</template>

<style>
.v-input-generated {
  margin: 0 1rem 0 0 !important;
}

.v-input--is-readonly {
  pointer-events: none !important;
}

.v-input--is-readonly fieldset {
  border-color: #ddd;
  background-color: #F5F5F5;
}

.v-input--is-readonly * {
  color: #555 !important;
}

#form-base > div {
  width: 100%;
}

.group > span:first-child {
  margin: 0.5rem 0.5rem 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  display: block;
}

</style>

<style scoped>
.buttonGroup {
  margin-top: 1rem;
}

.buttonGroup > button {
  font-weight: bold;
  margin-left: 1rem;
  margin-right: 0.25rem;
}
</style>

<script lang="ts">
import {Component, Emit, Prop, Ref, Vue} from "vue-property-decorator";
import {FormTO} from "@/api/models";
import VFormBase from 'vuetify-form-base';
import AppLoadingButton from "@/components/app/AppLoadingButton.vue";
import {DateTime} from "luxon";

@Component({
  components: {
    LoadingButton: AppLoadingButton,
    VFormBase
  }
})
export default class TaskForm extends Vue {

  model: any = {};

  modelInit = false;

  parsedSchema: any = {};

  @Prop()
  buttonText!: string;

  @Prop()
  form!: FormTO;

  @Ref("form")
  myForm: any;

  @Prop()
  initModel: any;

  @Prop()
  readonlyMode: boolean | undefined;

  /**
   * Props for Form Buttons
   */

  @Prop()
  buttonsDisabled: boolean | undefined;

  @Prop()
  isCompleting: boolean | undefined;

  @Prop()
  hasCompleteError: boolean | undefined;

  @Emit("complete-form")
  emitCompleteForm(): any {
    return this.model;
  }

  @Emit("model-changed")
  modelChanged(): boolean {
    // this.checkVisibility();
    return this.model;
  }

  created(): void {
    this.model = {...this.initModel};
    this.parsedSchema = this.parseSchema();
    // this.checkVisibility();
  }

  completeForm(): void {
    const erg = this.myForm.validate();
    if (erg) {
      this.emitCompleteForm();
    } else {
      this.$nextTick(() => {
        const domRectElement: any = document.querySelector('.error--text');
        if (!domRectElement) {
          return;
        }

        const domRect = domRectElement.getBoundingClientRect();
        window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop - domRect.height - 20
        );
      });
    }
  }

  mounted(): void {
    if (this.myForm) {
      this.myForm.resetValidation();
    }
  }

  parseSchema(): any {
    const groups: any = {};
    this.form.groups.forEach(group => {
      group.schema.forEach(field => {

        //save visibilityRules
        // field.visibilityRules = field.rules.filter(rule -> rule.type === 'requiredOn' && rule.handleVisibility);
        field.rules = field.rules?.map(rule => {
          switch (rule.type) {
            case 'minLength': {
              return (v: any) => (v && v.length >= rule.value) || ('Mindestlänge ' + rule.value);
            }
            case 'maxLength': {
              return (v: any) => (!v || v.length <= rule.value) || ('Maximallänge ' + rule.value);
            }
            case 'min': {
              return (v: number) => (v && v >= rule.value) || ('Min. ' + rule.value);
            }
            case 'max': {
              return (v: number) => (!v || v <= rule.value) || ('Max. ' + rule.value);
            }
            case 'required': {
              return (v: any) => (!!v && v !== '') || 'Pflichtfeld';
            }
            case 'requiredOn': {
              return (v: any) => {
                return this.requiredOnRule(rule, v);
              };
            }
            case 'requiredOnEmpty': {
              return (v: any) => {
                return (!this.model[rule.target] || this.model[rule.target] === '') ? ((!!v && v !== '' && v !== undefined) || 'Pflichtfeld') : true;
              };
            }
          }
        }) || [];
      });
    });

    this.form.groups.forEach((group, index) => {
      const schema: any = {};
      group.schema.forEach(entry => {

        //hier i18n
        const field: any = {
          ...entry,
          "outlined": true,
          "class": "v-input-generated",
          "auto-grow": true,
          "locale": "de"
        };


        if (this.readonlyMode) {
          field["readonly"] = true;
        }

        //TODO in eigene Date Komponente auslagern
        //parse dates for UI
        if (this.model[entry.key] && entry.ext == "date") {
          const dateTime = DateTime.fromFormat(this.model[entry.key], "dd.MM.yyyy");
          if (dateTime.isValid) {
            this.model[entry.key] = dateTime.toISODate();
          }
        }

        if (!this.model[entry.key] && entry.key) {
          if (entry.type === "document-input" || entry.type === "alw-document-input") {
            this.model[entry.key] = [];
          } else {
            this.model[entry.key] = entry.defaultValue;
          }
        }

        schema[entry.key] = field;
        delete schema[entry.key].key;
        delete schema[entry.key].visibilityRules;
      });

      const newGroup: any = {
        type: "wrap",
        label: group.label,
        description: group.description,
        schema: schema,
        "class": "group"
      };
      groups['group' + index] = newGroup;
    });
    return groups;
  }


  requiredOnRule(rule: any, v: any): boolean | string {
    if (rule.value === "") {
      return this.model[rule.target] ? ((!!v && v !== '' && v !== undefined && v.length > 0) || 'Pflichtfeld') : true;
    }

    if (rule.value === "true") {
      return this.model[rule.target] ? ((!!v && v !== '' && v !== undefined && v.length > 0) || 'Pflichtfeld') : true;
    }

    if (rule.value === "false") {
      return !this.model[rule.target] ? ((!!v && v !== '' && v !== undefined && v.length > 0) || 'Pflichtfeld') : true;
    }

    return rule.value.split(';').indexOf(this.model[rule.target]) !== -1 ? ((!!v && v !== '' && v !== undefined && v.length > 0) || 'Pflichtfeld') : true;
  }


}
</script>
