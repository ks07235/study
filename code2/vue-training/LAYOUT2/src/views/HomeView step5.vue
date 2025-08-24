

<template>

<!--상단 타이틀 추가하기-->
<div class="d-flex flex-column h-100">

	<div class="app-header d-flex justify-content-between border-bottom bg-white p-5">

		<button class="w-100px btn btn-icon btn-light">
			<i class="ki-duotone ki-arrow-left fs-2x text-primary">
				<span class="path1"></span> 
				<span class="path2"></span> 
			</i>
		</button>

		<span class="w-550px fs-2 fw-bold">안전등산</span>

		<button class="w-100px btn btn-icon btn-light">
			<i class="ki-duotone ki-setting-2 fs-2x text-primary">
				<span class="path1"></span> 
				<span class="path2"></span> 
			</i>
		</button>

	</div>



	<!--메인 영역-->
	<div class="flex-glow-1 overflow-auto bg-secondary p-10 p-lg-20 h-90">
		
		<h1>메인 영역</h1>

		<div class="d-flex flex-column flex-fill border h-100px">

			<div class="flex-fill bg-primary text-white">첫번째</div>


		</div>

		<div>

			<div class="d-flex flex-column border h-200px">

				<div class="flex-fill bg-primary text-white">첫번째</div>
				<div class="flex-fill bg-info text-white">두번째</div>
			</div>
			
			<div class="d-flex flex-row border h-200px">

				<div class="flex-fill bg-primary text-white">첫번째</div>
				<div class="flex-fill bg-info text-white">두번째</div>
				<div class="flex-fill bg-success text-white">두번째</div>
			</div>



			<div class="d-flex flex-column border h-200px">
				<div class="h-100px bg-primary text-white" style="height: 25%;">첫번째</div>
				<div class="flex-grow-1 bg-info text-white" style="height: 25%;">두번째</div>
				<div class="h-50px bg-success text-white" style="height: 25%;">두번째</div>
			</div>






		</div>

	</div>



	<!--하단 탭-->

	<!--border-top:위쪽 테두리 -->
	<div class="fixed-bottom bg-white border-top h-10">

		<div class="d-flex justify-content-around align-items-center py-3">

			<div>
				<div class="d-flex flex-column align-items-center w-100px">
					<div class="">
						<i class="ki-outline ki-calendar-add fs-4x"></i>
					</div>
					<div>
					<button class="btn btn-light">
						<span>코스</span>
					</button>
					</div>
				</div>
			</div>
			<div>
				<div class="d-flex flex-column align-items-center w-100px">
					<div class="">
						<i class="ki-outline ki-calendar-add fs-4x"></i>
					</div>
					<div>
					<button class="btn btn-light">
						<span>등산</span>
					</button>
					</div>
				</div>
			</div>
			<div>
				<div class="d-flex flex-column align-items-center w-100px">
					<div class="">
						<i class="ki-outline ki-calendar-add fs-4x"></i>
					</div>
					<div>
					<button class="btn btn-light">
						<span>홈</span>
					</button>
					</div>
				</div>
			</div>
			<div>
				<div class="d-flex flex-column align-items-center w-100px">
					<div class="">
						<i class="ki-outline ki-calendar-add fs-4x"></i>
					</div>
					<div>
					<button class="btn btn-light">
						<span>위험신고</span>
					</button>
					</div>
				</div>
			</div>
			<div>
				<div class="d-flex flex-column align-items-center w-100px">
					<div class="">
						<i class="ki-outline ki-calendar-add fs-4x"></i>
					</div>
					<div>
					<button class="btn btn-light">
						<span>커뮤니티</span>
					</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


</template>


<script setup>

</script>

<style scoped>


.my-border {
	border: 2px dashed violet;


}
</style>