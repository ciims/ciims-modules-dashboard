<div class="dashboard-cards"></div>
<div class="shader"></div>

<?php Yii::app()->clientScript->registerScriptFile($this->asset .'/dist/jquery-ui.min.js'); ?>
<?php Yii::app()->clientScript->registerScript('DashboardInit', 'Dashboard.init()'); ?>