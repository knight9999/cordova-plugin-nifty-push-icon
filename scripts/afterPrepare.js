// afterPrepare Hook Scripts

module.exports = function(context) {
  var fs = context.requireCordovaModule('fs');
  if ( context.opts.platforms.indexOf("android") >=0 ) {
    var fs = require('fs');
    var ConfigParser;
    try {
      ConfigParser = context.requireCordovaModule("cordova-lib/src/configparser/ConfigParser");
    } catch (e) {
      ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
    }
    console.log( " --- NityPushIcon Plugin Start --- " );

    var configXml = "config.xml";
    var cfg = new ConfigParser(configXml);

    var getPreference = function (name) {
      var value = cfg.getPlatformPreference(name,"android");
      if (! value) {
        value = cfg.getGlobalPreference(name);
      }
      return value;
    }

    // var niftyPushIcon = cfg.getPlatformPreference("niftyPushIcon","android");
    // if (! niftyPushIcon ) {
    //   niftyPushIcon = cfg.getGlobalPreference("niftyPushIcon");
    // }
    var niftyPushIcon = getPreference("niftyPushIcon");
    if (! niftyPushIcon ) {
      niftyPushIcon = "www/nifty_push_icon.png";
    }

    var resolutions = [ "ldpi" , "mdpi" , "hdpi" , "xhdpi" , "xxhdpi" ];

    for (var i = 0;i<resolutions.length;i++) {
      var resolution = resolutions[i];
      var niftyPushIconRes = getPreference("niftyPushIcon-" + resolution );
      if (! niftyPushIconRes) {
        niftyPushIconRes = niftyPushIcon;
      }

      try {
        var stat = fs.statSync( niftyPushIconRes );
        if (stat.isFile()) {
          var dir = 'platforms/android/res/drawable-' + resolution;
          stat = fs.statSync( dir );
          if (stat.isDirectory()) {
            fs.createReadStream( niftyPushIconRes ).pipe(fs.createWriteStream(dir + '/nifty_push_icon.png'));
            console.log( "copy " + niftyPushIconRes + " to " + dir );
          }
        } else {
          console.log( niftyPushIcon + " is not file.");
        }
      } catch (e) {
        console.log( niftyPushIcon + " is not found. ");
      }

    }
    // console.log( JSON.stringify( context.cordova ) );
    console.log( " --- NiftyPushIcon Plugin End --- ");
  }

};
