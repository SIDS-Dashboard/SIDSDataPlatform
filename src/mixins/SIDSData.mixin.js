import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      SIDSDataWithDonors: state => state.SIDSDataWithDonors,
    }),
    filteredYearDataSIDS() {
      if(this.year !== 'all') {
        return this.SIDSDataWithDonors.filter(project => {
            return project.year === this.year
        })
      }
      return this.SIDSDataWithDonors
    },
    filteredProjects() {
      let filteredProjects = this.filteredYearDataSIDS;
      if(this.fundingCategory !== 'All') {
        filteredProjects = filteredProjects.filter((project) => project.donors.some(donor => {
          return this.checkProjectsCategory(project, donor)
        }))
      }
      return filteredProjects
    },
  },
  methods: {
    checkProjectsCategory(project, donor) {
      if(this.fundingCategory === 'Programme Countries') {
        return donor.category === 'Government' && project.country === donor.subCategory;
      }
      else if(this.fundingCategory === 'Donor Countries') {
        return project.country  != donor.subCategory;
      }
      else {
        return donor.category === this.fundingCategory;
      }
    }
  }
}
