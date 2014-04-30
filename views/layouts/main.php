<!DOCTYPE html>
<html lang="<?php echo Yii::app()->getLanguage(); ?>">
    <head>
        <?php Yii::app()->clientScript->registerCssFile($this->asset .'/'. (YII_DEBUG ? '/dashboard.css' : 'dashboard.min.css')); ?>
        <?php Yii::app()->clientScript->registerScriptFile($this->asset .'/'. (YII_DEBUG ? '/dashboard.js' : 'dashboard.min.js')); ?>
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
    </head>
    <body>
    	<?php echo $content; ?>
    </body>
</html>
