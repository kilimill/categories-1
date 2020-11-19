define(['jquery', 'backbone', 'underscore', 'epoxy', 'validation', 'mask', 'custom_select'], function ($, Backbone, _) {

  var LeadModel = Backbone.Epoxy.Model.extend({

    defaults: {

      active: false,
      finish: false,
      sending: false,
      customer_name: '',
      customer_phone: '',
      customer_message: '',
      customer_topic: 0

    },

    validation: {
      customer_name: [{
        required: true,
        msg: 'Р’РІРµРґРёС‚Рµ РёРјСЏ'
      }, {
        minLength: 2,
        msg: 'РЎР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ РёРјСЏ'
      }],

      customer_phone: [{
        required: true,
        msg: 'Р’РІРµРґРёС‚Рµ С‚РµР»РµС„РѕРЅ'
      }, {
        minLength: 19,
        msg: 'Р’РІРµРґРёС‚Рµ РєРѕСЂСЂРµРєС‚РЅС‹Р№ С‚РµР»РµС„РѕРЅ'
      }],

      customer_message: [{
        required: true,
        msg: 'Р’РІРµРґРёС‚Рµ СЃРѕРѕР±С‰РµРЅРёРµ'
      }, {
        minLength: 2,
        msg: 'РЎРѕРѕР±С‰РµРЅРёРµ СЃР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ'
      }]
    }

  });


  var LeadView = Backbone.Epoxy.View.extend({

    bindings: {
      ':el': 'classes: {active: active}',
      '.popup-content': 'classes: {finish: finish}',
      '.lead-form': 'toggle:not(finish)',
      '.lead-finish': 'toggle:finish',
      '#customer_name': 'value:customer_name,events:["keyup"]',
      '#customer_phone': 'value:customer_phone,events:["keyup"]',
      '#customer_topic': 'value:customer_topic',
      '#customer_message': 'value:customer_message,events:["keyup"]'
    },

    events: {
      'click #lead-dir-submit': 'submitLead',
      'click .close-button': 'closeLead',
      'click .close-popup-btn': 'closeLead'
    },

    closeLead: function () {
      this.model.set('active', false);
      this.model.set('finish', false);
    },

    submitLead: function () {
      if (this.model.isValid(true) && !this.model.get('sending')) {
        var self = this;
        var customer_name = this.model.get('customer_name');
        var customer_phone = this.model.get('customer_phone');
        var customer_topic = this.model.get('customer_topic');
        var customer_message = this.model.get('customer_message');
        this.model.set('sending', true);
        $.ajax({
          url: '/lead-ask',
          type: 'POST',
          data: {
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_topic: customer_topic,
            customer_message: customer_message
          }
        }).done(function (response) {

          if (typeof ga !== 'undefined') {
            ga('send', 'event', 'form', 'vopros_directory');
          }

          if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
          }

          self.model.set('finish', true);
          self.model.set('sending', false);
        }).fail(function (response) {
          alert('РћС€РёР±РєР°');
          self.model.set('finish', true);
          self.model.set('sending', false);
        });

      }
    },

    initialize: function (options) {
      var buttonClass = options.buttonClass,
        self = this;

      this.model = new LeadModel();

      $('.' + buttonClass).click(function () {
        self.model.set('active', true);
      });
      $('#dir-lead-button-top').click(function () {
        self.model.set('active', true);
      });

      Backbone.Validation.bind(this, {

        valid: function (view, attr) {
          var $field = $('#' + attr, self.$el).parent();
          $field.removeClass('invalid');
          $('.error-label', $field).text('');
        },

        invalid: function (view, attr, error) {
          var $field = $('#' + attr, self.$el).parent();
          $field.addClass('invalid');
          $('.error-label', $field).text(error);
        }

      });

      this.listenTo(this.model, 'change:customer_name', function (model) {
        model.isValid('customer_name');
      });

      this.listenTo(this.model, 'change:customer_phone', function (model) {
        model.isValid('customer_phone');
      });

      this.listenTo(this.model, 'change:customer_message', function (model) {
        model.isValid('customer_message');
      });

      $('#customer_phone', this.$el).mask("+38 (000) 000-00-00");

      $('#customer_topic', this.$el).customSelect();
    }

  });

  return LeadView;

});