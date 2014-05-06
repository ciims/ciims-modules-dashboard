<?php $this->widget('CiiSettingsForm', array('model' => $model)); ?>
<?php Yii::app()->clientScript->registerScript('nanoscroller', 'Settings.registerSettings();'); ?>
