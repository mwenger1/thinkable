(function($) {
  $(function() {
    /* define init variables for your organization */
    luminateExtend({
	    apiKey: 'MJFFAPI',
	    path: {
	      nonsecure: 'http://www2.michaeljfox.org/site/',
	      secure: 'https://secure3.convio.net/mjff/site/'
	    }
    });





    /* UI handlers for the Survey example */
    if($('.survey-form').length > 0) {
      $('.survey-form').submit(function() {
        //window.scrollTo(0, 0);
        var formIDName = $(this).attr('id');
        _gaq.push(['_trackEvent', 'form','thinkable', formIDName]);
        $(this).hide();
        $(this).before('<div class="survey-loading" style="text-align:center">' +
                         '<img src="images/ajax-loader.gif" alt="loading...">' +
                       '</div>');
      });
    }

    /* example: handle the Survey form submission */
    /* if the Survey is submitted succesfully, display a thank you message */
    /* if there is an error, display it inline */
    window.submitSurveyCallback = {
      error: function(data) {
        $('#survey-errors').remove();
        $('.survey-form .control-rows .alert').remove();

        $('.survey-form').prepend('<div id="survey-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        data.errorResponse.message +
                                      '</div>' +
                                    '</div>');

        $('.survey-loading').remove();
        $('.survey-form').show();
      },
      success: function(data) {
        $('#survey-errors').remove();
        $('.survey-form .controls-row .alert').remove();

        if(data.submitSurveyResponse.success == 'false') {
          $('.survey-form').prepend('<div id="survey-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        'There was an error with your submission. Please try again.' +
                                      '</div>' +
                                    '</div>');

          var surveyErrors = luminateExtend.utils.ensureArray(data.submitSurveyResponse.errors);
          $.each(surveyErrors, function() {
            if(this.errorField) {
              $('input[name="' + this.errorField + '"]').closest('.controls-row').prepend('<div class="alert alert-error">' +
                                                                   this.errorMessage +
                                                                 '</div>');
            }
          });

          $('.survey-loading').remove();
          $('.survey-form').show();
        }
        else {
          $('.survey-loading').remove();
          $('.survey-form').before('<div id="joinSuccess"><span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;' +
                                       'Thank you for joining!' +
                                     '</div>');
          setTimeout(function(){ jQuery("#joinForm").hide(); }, 3000);
        }
      }
    };

    /* MSG SUBMIT */

    window.submitMsgCallback = {
      error: function(data) {
        $('#msg-errors').remove();
        $('.msg-form .control-rows .alert').remove();

        $('.msg-form').prepend('<div id="msg-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        data.errorResponse.message +
                                      '</div>' +
                                    '</div>');

        $('.survey-loading').remove();
        $('.msg-form').show();
      },
      success: function(data) {
        $('#msg-errors').remove();
        $('.msg-form .controls-row .alert').remove();

        if(data.submitSurveyResponse.success == 'false') {
          $('.msg-form').prepend('<div id="msg-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        'There was an error with your submission. Please try again.' +
                                      '</div>' +
                                    '</div>');

          var surveyErrors = luminateExtend.utils.ensureArray(data.submitSurveyResponse.errors);
          $.each(surveyErrors, function() {
            if(this.errorField) {
              $('input[name="' + this.errorField + '"]').closest('.controls-row').prepend('<div class="alert alert-error">' +
                                                                   this.errorMessage +
                                                                 '</div>');
            }
          });

          $('.survey-loading').remove();
          $('.msg-form').show();
        }
        else {
          $('.survey-loading').remove();
          $('#message').remove();
          $('#msgThanks').show();
        }
      }
    };

    /* HOST SUBMIT */

    window.submitHostCallback = {
      error: function(data) {
        $('#host-errors').remove();
        $('.host-form .control-rows .alert').remove();

        $('.host-form').prepend('<div id="host-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        data.errorResponse.message +
                                      '</div>' +
                                    '</div>');

        $('.survey-loading').remove();
        $('.host-form').show();
      },
      success: function(data) {
        $('#host-errors').remove();
        $('.host-form .controls-row .alert').remove();

        if(data.submitSurveyResponse.success == 'false') {
          $('.host-form').prepend('<div id="host-errors" class="row">' +
                                      '<div class="col-xs-12">' +
                                        'There was an error with your submission. Please try again.' +
                                      '</div>' +
                                    '</div>');

          var surveyErrors = luminateExtend.utils.ensureArray(data.submitSurveyResponse.errors);
          $.each(surveyErrors, function() {
            if(this.errorField) {
              $('input[name="' + this.errorField + '"]').closest('.controls-row').prepend('<div class="alert alert-error">' +
                                                                   this.errorMessage +
                                                                 '</div>');
            }
          });

          $('.survey-loading').remove();
          $('.host-form').show();
        }
        else {
          $('.survey-loading').remove();
          $('#hostFormContent').remove();
          $('#hostThanks').show();
        }
      }
    };




    /* bind any forms with the "luminateApi" class */
    luminateExtend.api.bind();
  });
})(jQuery);