/**
 * WebHat Shader Provider Factory
 *
 * create shader providers for the users
 **/

var WHShaderProviderFactory = function() {
};

/**
 * Returns the Static WebHat shaders
 **/
WHShaderProviderFactory.prototype.webhatProvider = function() {
    return new WHStaticJSONShaderProvider("/stores/shaders/shaders.json");
};

/**
 * A provider for reading static json/shader context
 **/
var WHStaticJSONShaderProvider = function (url) {
    this.url = url;
    this.data = null;
};

/**
 * Returns the JSON information file
 **/
WHStaticJSONShaderProvider.prototype.get = function(callback) {

    if (this.data != null){
        callback(this.data);
    }
    else
    {
        $.getJSON(this.url,{}).
            done(function (data)
            {
                console.log(data);
                callback(data);
            });
    }
};