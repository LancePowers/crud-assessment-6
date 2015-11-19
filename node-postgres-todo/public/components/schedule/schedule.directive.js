(function () {
    'use strict ';
    angular.module('app.components.schedule')
        .directive('schedule', scheduleDirective);

    function scheduleDirective() {
        console.log('in directive')
        return {
            restrict: 'E',
            templateUrl: 'components/schedule/schedule.html',
            scope: {},
            controller: ScheduleController,
            controllerAs: 'vm',
            bindToController: true,
        }
    }


    ScheduleController.$inject = ['scheduleHolder'];

    function ScheduleController(scheduleHolder) {
        var vm = this;
        vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    };
})();