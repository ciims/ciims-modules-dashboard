<div class="dashboard-cards">
	<div style="background: #fff; width: 230px; height: 230px; ">foo </div>
	<div style="background: #fff; width: 230px; height: 230px; ">bar</div>
	<div style="background: #fff; width: 230px; height: 230px; ;">;et</div>
	<div style="background: #fff; width: 230px; height: 230px; ">fds</div>
	<div style="background: #fff; width: 230px; height: 230px; ">asdf</div>
	<div style="background: #fff; width: 230px; height: 230px; ">aaaaaa</div>
	<div style="background: #fff; width: 230px; height: 230px; ">fgggg</div>
</div>

<div class="shader"></div>

<?php Yii::app()->clientScript->registerScriptFile($this->asset .'/dist/jquery-ui.min.js'); ?>
<?php Yii::app()->clientScript->registerScript('DashboardInit', 'Dashboard.init()'); ?>