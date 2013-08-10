drupalgap.views_datasource = {
  'options':{
    local_storage_key:null,
    success:function(data) {
      var local_storage_key = drupalgap.views_datasource.options.local_storage_key;
      alert('saving to local storage ' + local_storage_key);
      window.localStorage.setItem(local_storage_key, JSON.stringify(data));
    }
  },
  'call':function(options) {
	  try {
		  if (!options.path) {
			  navigator.notification.alert(
					'No path provided!',
					function(){},
					'DrupalGap Views Datasource Error',
					'OK'
				);
			  return;
		  }
		  // The local storage key will be the path to the data source.
      var local_storage_key = options.path;
      // Process options if necessary.
      if (options) {
        // If we are resetting, remove the item from localStorage.
        if (options.reset) {
          alert('removing from local storage');
          window.localStorage.removeItem(local_storage_key);
        }
      }
      // Attempt to load the entity from local storage.
      var data = window.localStorage.getItem(local_storage_key);
      if (data) {
        alert('loaded from local storage');
        // Data loaded from local storage, send it to the success callback if
        // the call back exists, otherwise just return the data.
        var parsed_data = JSON.parse(data);
        if (options.success) {
          options.success.call(null, parsed_data);
        }
        else { return parsed_data; }
      }
      else {
        drupalgap.views_datasource.options.local_storage_key = local_storage_key;
        var api_options = drupalgap_chain_callbacks(drupalgap.views_datasource.options, options);
        api_options.endpoint = '';
        api_options.path = options.path;
        drupalgap.api.call(api_options);
      }
		  
	  }
	  catch (error) {
		  navigator.notification.alert(
				error,
				function(){},
				'DrupalGap Views Datasource Error',
				'OK'
			);
	  }
	  
  }
};