# cordova-plugin-nifty-push-icon

## プラグインの機能

ncmb-push-monaca-pluginプラグインと合わせて使用するプラグインです。
通知領域に表示するアイコンを、アプリアイコンとは別に設定出来るようになります。
MonacaおよびCordovaで利用出来ます。
Monacaの場合、カスタムプラグインとなるため、Goldプラン以上のアカウントが必要になります。

## Monacaでの簡単な使い方

プロジェクトに本プラグインを組み込みます。
また、Niftyプッシュ通知プラグインv2.x.x (ncmb-push-monaca-plugin)も必要になります。

プロジェクトのwwwディレクトリの直下にアイコンファイルとして

    nifty_push_icon.png

ファイルを置いて下さい。
すると、プッシュ通知時のアイコンがnifty_push_icon.pngになります。
（本プラグインをインポートした状態で、アイコンファイルを置かないと、ビルドエラーになりますので、
ご注意下さい）


## 高度な使い方

アイコンのファイル名や置き場所を変更したい場合は、config.xmlを編集して下さい。
例えば、config.xmlに

    <preference name="niftyPushIcon" value="www/my_icon.png"/>

とすると、www/my_icon.pngが使用されます。

## 解像度別のアイコンを指定したい場合

解像度ごとに別のアイコンを使いたい場合は、config.xmlに以下のように記述して下さい。

    <preference name="niftyPushIcon-ldpi" value="www/my_icon_ldpi.png"/>
    <preference name="niftyPushIcon-mdpi" value="www/my_icon_mdpi.png"/>
    <preference name="niftyPushIcon-hdpi" value="www/my_icon_hdpi.png"/>
    <preference name="niftyPushIcon-xhdpi" value="www/my_icon_xhdpi.png"/>

すると、それぞれの解像度のアイコンが使用されるようになります。

## テクニカルノート

このプラグインでは、Prepare前のフックスクリプトにより、指定された画像をres/drawableディレクトリに
コピーしています。
コピー元のファイル名がなんであっても、コピー先はnifty_push_icon.pngファイルとなります。


