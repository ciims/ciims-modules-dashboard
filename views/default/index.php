<div class="settings-sidebar"></div>
<div class="dashboard-cards"></div>
<div class="shader"></div>

<span id="settings-text" style="display:none;"><?php echo Yii::t('Dashboard.main', '{cardname} Settings'); ?></span>
<a href="#" id="submit-card-button" class="pure-button pure-button-primary pure-button-small" style="display:none;"><?php echo Yii::t('Dashboard.main', 'Submit Card Changes'); ?></a>
<?php Yii::app()->clientScript->registerScriptFile($this->asset .'/dist/jquery-ui.min.js'); ?>
<?php Yii::app()->clientScript->registerScript('DashboardInit', 'Dashboard.init()'); ?>