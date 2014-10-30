<div class="dashboard-cards">
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div data-ss-colspan="2" style="background: #fff; width: 482px; height: 482px; ;"></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 482px; "></div>
	<div data-ss-colspan="2" style="background: #fff; width: 482px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
	<div style="background: #fff; width: 230px; height: 230px; "></div>
</div>

<div class="shader"></div>

<?php Yii::app()->clientScript->registerScriptFile($this->asset .'/dist/jquery-ui.min.js'); ?>
<?php Yii::app()->clientScript->registerScript('DashboardInit', 'Dashboard.init()'); ?>