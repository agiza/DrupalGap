drupalgap.services.drupalgap_system = {
  'connect':{
    'options':{
      'type':'post',
      'path':'drupalgap_system/connect.json',
      'success':function(data){
        // Set the session id.
        //drupalgap.sessid = data.system_connect.sessid;
        // Set the drupalgap.user to the system connect user.
        drupalgap.user = data.system_connect.user;
        // Extract drupalgap service resource results.
        drupalgap.entity_info = data.entity_info;
        drupalgap.field_info_instances = data.field_info_instances;
        drupalgap.field_info_fields = data.field_info_fields;
        drupalgap_service_resource_extract_results({
          'service':'drupalgap_system',
          'resource':'connect',
          'data':data
        });
      },
    },
    'call':function(options){
      try {
        var api_options = drupalgap_chain_callbacks(drupalgap.services.drupalgap_system.connect.options, options);
        services_attach_service_and_resource_names_to_api_options($(this), api_options);
        drupalgap.api.call(api_options);
      }
      catch (error) {
        navigator.notification.alert(
          error,
          function(){},
          'DrupalGap System Connect Error',
          'OK'
        );
      }
    },
  }, // <!-- connect -->
};
